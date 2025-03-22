"use client";
import { useState } from "react";
import { Google, Github, Discord, Spinner } from "@zora/ui/icons";
import { OAuthButton } from "@zora/ui/components";
import { OAUTH_PROVIDERS } from "@/constants/types";
import { handleSignIn } from "@/auth/handle-signin";
import { clsx } from "clsx";

export function AuthForm() {
  const [method, setMethod] = useState<OAUTH_PROVIDERS | undefined>();
  const classes = clsx(
    "flex flex-col gap-4 items-scretch",
    "bg-mistvell border-t border-dawnlight",
    "px-8 py-16 md:px-12 md:py-20",
  );

  return (
    <div className={classes}>
      <OAuthButton
        label="Continue with Github"
        icon={method === "github" ? <Spinner className="size-4" /> : <Github className="size-4" />}
        disabled={method === "github"}
        onClick={async () => {
          setMethod("github");
          await handleSignIn("github");
        }}
      />
      <OAuthButton
        label="Continue with Google"
        icon={method === "google" ? <Spinner className="size-4" /> : <Google className="size-4" />}
        disabled={method === "google"}
        onClick={async () => {
          setMethod("google");
          await handleSignIn("google");
        }}
      />
      <OAuthButton
        label="Continue with Discord"
        icon={method === "discord" ? <Spinner className="size-4" /> : <Discord className="size-4" />}
        disabled={method === "discord"}
        onClick={async () => {
          setMethod("discord");
          await handleSignIn("discord");
        }}
      />
    </div>
  );
}
