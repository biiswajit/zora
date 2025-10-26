import { Button } from "@zora/ui/web/components/button";
import { Spinner } from "@zora/ui/web/components/spinner";
import { Google } from "@zora/ui/web/icons/google";
import { RedirectType, redirect } from "next/navigation";
import { signIn } from "@/utils/auth-client";
import type { AuthButtonProps } from "./form";

export function GoogleButton({ clickedMethod, setClickedMethod }: AuthButtonProps) {
    return (
        <Button
            variant="outline"
            disabled={clickedMethod !== undefined}
            onClick={async () => {
                signIn.social(
                    {
                        provider: "google",
                    },
                    {
                        onRequest: () => {
                            setClickedMethod("google");
                        },
                        onSuccess: () => {
                            redirect("/", RedirectType.replace);
                        },
                    },
                );
            }}>
            {clickedMethod === "google" ? <Spinner /> : <Google />}
            Continue with Google
        </Button>
    );
}
