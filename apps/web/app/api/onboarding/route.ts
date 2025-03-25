import { DescriptionProducer, DescriptionSchema } from "@zora/utils";
import { auth } from "@/auth/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@zora/database";

export async function POST(request: NextRequest) {
  try {
    // 1. Session Validation
    const session = await auth.api.getSession({ headers: await headers() });

    // 2. Authentication Check
    if (!session?.session) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    // 3. Onboarding Check
    const prismaRes = await prisma.user.findFirst({
      where: { id: session.session.userId },
      select: { onboarded: true },
    });

    if (prismaRes?.onboarded) {
      return NextResponse.json({ success: false, message: "All set already!" }, { status: 200 });
    }

    // 4. Payload Parsing
    let payload;
    try {
      payload = await request.json();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return NextResponse.json({ success: false, message: "Invalid request body" }, { status: 400 });
    }

    // 5. Payload Validation with Detailed Error Handling
    const parsed = DescriptionSchema.safeParse(payload);
    if (!parsed.success) {
      return NextResponse.json({ success: false, message: "Invalid data received" }, { status: 422 });
    }

    // 6. RabbitMQ Connection with Timeout and Retry Logic
    const producer = DescriptionProducer.getInstance();

    try {
      const connected = await Promise.race([
        producer.connect(),
        new Promise((_, reject) => setTimeout(() => reject(new Error("Connection timeout")), 5000)),
      ]);

      if (!connected) {
        throw new Error("Failed to connect to RabbitMQ");
      }

      const successed = await prisma.$transaction(async (tx) => {
        // 7. Message Sending with Retry
        const sent = await Promise.race([
          producer.send(parsed.data),
          new Promise((_, reject) => setTimeout(() => reject(new Error("Message send timeout")), 5000)),
        ]);

        if (!sent) {
          throw new Error("Unable to send message to RabbitMQ");
        }

        await tx.user.update({ where: { id: session.session.userId }, data: { onboarded: true } });

        return true;
      });

      if (!successed) {
        throw new Error("Failed to do the transaction");
      }

      return NextResponse.json({ success: true, message: "Your description has been saved" }, { status: 200 });
    } catch (mqError) {
      console.error("RabbitMQ Error:", mqError);
      return NextResponse.json({ success: false, message: "We're facing some internal issues" }, { status: 500 });
    }
  } catch (error) {
    // 8. Catch-all Error Handler
    console.error("Unexpected error:", error);
    return NextResponse.json({ success: false, message: "An unexpected error occurred" }, { status: 500 });
  }
}
