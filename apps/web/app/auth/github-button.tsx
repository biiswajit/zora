import { Button } from "@zora/ui/web/components/button";
import { Spinner } from "@zora/ui/web/components/spinner";
import { Github } from "@zora/ui/web/icons/github";
import { RedirectType, redirect } from "next/navigation";
import { signIn } from "@/utils/auth-client";
import type { AuthButtonProps } from "./form";

export function GithubButton({ clickedMethod, setClickedMethod }: AuthButtonProps) {
    return (
        <Button
            variant="outline"
            disabled={clickedMethod !== undefined}
            onClick={async () => {
                signIn.social(
                    {
                        provider: "github",
                    },
                    {
                        onRequest: () => {
                            setClickedMethod("github");
                        },
                        onSuccess: () => {
                            redirect("/", RedirectType.replace);
                        },
                    },
                );
            }}>
            {clickedMethod === "github" ? <Spinner /> : <Github />}
            Continue with Github
        </Button>
    );
}
