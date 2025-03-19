"use client";
import { ComponentProps } from "react";
import { clsx } from "clsx";
import { Google, GitHub, Discord } from "@zora/ui/icons";
import { Button } from "@zora/ui/components";
import { handleSignIn } from "@/auth/handle-signin";

export type AuthFormProps = ComponentProps<"form">;

export default function AuthForm({ className, ...props }: AuthFormProps) {
  const classes = clsx("flex flex-col gap-4", className);

  return (
    <form className={classes} {...props}>
      <Button onClick={async () => await handleSignIn("google")} className="py-2 rounded-lg flex gap-2 justify-center">
        <Google className="w-[24px] h-[24px]" />
        Continue with Google
      </Button>
      <Button onClick={async () => await handleSignIn("github")} className="py-2 rounded-lg flex gap-2 justify-center">
        <GitHub className="w-[24px] h-[24px]" />
        Continue with GitHub
      </Button>
      <Button onClick={async () => await handleSignIn("discord")} className="py-2 rounded-lg flex gap-2 justify-center">
        <Discord className="w-[24px] h-[24px]" />
        Continue with Discord
      </Button>
    </form>
  );
}
