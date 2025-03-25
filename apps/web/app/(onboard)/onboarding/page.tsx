import { auth } from "@/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { OnboardingForm } from "./form";

export default async function OnboardingPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.session) {
    redirect("/auth");
  }

  return <OnboardingForm userId={session.session.userId} />;
}
