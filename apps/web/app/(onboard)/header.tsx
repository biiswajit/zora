"use client";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();

  if (pathname === "/auth") {
    return (
      <div className="font-body text-center">
        <p className="font-semibold text-2xl text-midnight">Continue with Zora</p>
        <p className="text-moonshadow text-sm mt-1">
          Choose any provider as your choise <br /> signup or login in one place
        </p>
      </div>
    );
  }

  if (pathname === "/onboarding") {
    return (
      <div className="font-body text-center">
        <p className="font-semibold text-2xl text-midnight">Tell us about yourself</p>
        <p className="text-moonshadow text-sm mt-1">
          A detailed description can help you <br /> to find a perfect match
        </p>
      </div>
    );
  }
}
