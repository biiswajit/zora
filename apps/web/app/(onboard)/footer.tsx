"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();

  if (pathname === "/auth") {
    return (
      <p className="font-body text-midnight text-center text-sm">
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

  if (pathname === "/onboarding") {
    return (
      <Link
        href="/discover"
        className="font-body text-midnight text-center text-sm underline underline-offset-4 hover:text-moonshadow">
        {"I'll do it later"}
      </Link>
    );
  }
}
