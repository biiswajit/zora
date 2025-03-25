"use client";
import { useState } from "react";
import { Google, Github, Discord, Spinner } from "@zora/ui/icons";
import { OAuthButton } from "@zora/ui/components";
import { OAUTH_PROVIDERS } from "@/constants/types";
import { handleSignIn } from "@/auth/handle-signin";

export function AuthForm() {
  const [method, setMethod] = useState<OAUTH_PROVIDERS | undefined>();

  return (
    <div className="flex flex-col gap-4 w-[360px]">
      <OAuthButton
        label="Continue with Github"
        icon={method === "github" ? <Spinner className="size-4" /> : <Github className="size-4" />}
        disabled={method != undefined}
        onClick={async () => {
          setMethod("github");
          await handleSignIn("github");
        }}
      />
      <OAuthButton
        label="Continue with Google"
        icon={method === "google" ? <Spinner className="size-4" /> : <Google className="size-4" />}
        disabled={method != undefined}
        onClick={async () => {
          setMethod("google");
          await handleSignIn("google");
        }}
      />
      <OAuthButton
        label="Continue with Discord"
        icon={method === "discord" ? <Spinner className="size-4" /> : <Discord className="size-4" />}
        disabled={method != undefined}
        onClick={async () => {
          setMethod("discord");
          await handleSignIn("discord");
        }}
      />
    </div>
  );
}
