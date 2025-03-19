import AuthForm from "./form";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth/auth";
import { headers } from "next/headers";
import { EXISTING_USER_REDIRECT_TO } from "@/constants/urls";

export default async function Auth() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (session) {
    redirect(EXISTING_USER_REDIRECT_TO);
  }

  return (
    <div className="flex felx-row gap-4 items-stretch h-screen w-screen bg-gray-100 p-4">
      <div className="bg-inherit basis-1/1 md:basis-1/2 lg:basis-1/3 flex flex-col gap-10 place-items-center justify-center">
        <p className="font-body font-bold text-2xl sm:text-3xl text-black line-clamp-2 leading-8 w-[80%]">
          Continue with <span className="font-extrabold text-blue text-3xl">Zora</span>
          <br />
          {"You're only one step away"}
        </p>
        <AuthForm className="w-[80%]" />
        <p className="text-black px-8 text-center text-sm text-muted-foreground justify-self-end">
          By clicking continue, you agree to our <br />
          <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
      <div className="bg-blue rounded-2xl shadow-2xl hidden sm:block md:basis-1/2 lg:basis-2/3" />
    </div>
  );
}
