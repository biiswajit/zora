import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth/auth";
import { headers } from "next/headers";
import { EXISTING_USER_REDIRECT_TO } from "@/constants/urls";
import { AuthFormContainer } from "./form-container";
import clsx from "clsx";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zora | Authentication",
  description: "Signup or login to your existing account",
};

export default async function Auth() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (session) {
    redirect(EXISTING_USER_REDIRECT_TO);
  }

  const classes = clsx("grid gap-4 place-content-center", "h-screen");

  return (
    <div className={classes}>
      <AuthFormContainer />
      <TermsAndCondition />
    </div>
  );
}

function TermsAndCondition() {
  return (
    <p className="font-body text-midnight text-center text-xs">
      By clicking continue, you agree to our <br />
      <Link href="/terms" className="underline underline-offset-4 hover:text-moonshadow">
        Terms of Service
      </Link>{" "}
      and{" "}
      <Link href="/privacy" className="underline underline-offset-4 hover:text-moonshadow">
        Privacy Policy
      </Link>
      .
    </p>
  );
}
