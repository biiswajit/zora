import { Button } from "@zora/ui/web/components/button";
import { Spinner } from "@zora/ui/web/components/spinner";
import { Github } from "@zora/ui/web/icons/github";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { signIn } from "@/utils/auth-client";
import type { AuthButtonProps } from "./form";

export function GithubButton({ clickedMethod, setClickedMethod }: AuthButtonProps) {
    const router = useRouter();

    return (
        <Button
            variant="outline"
            disabled={clickedMethod !== undefined}
            onClick={async () => {
                await signIn.social({
                    provider: "github",
                    fetchOptions: {
                        onRequest() {
                            setClickedMethod("github");
                        },
                        onSuccess() {
                            router.push("/");
                        },
                        onError() {
                            toast.error(
                                "Unexpected error occured, please try again or contact maintainer",
                            );
                        },
                        onResponse() {
                            setClickedMethod(undefined);
                        },
                    },
                });
            }}>
            {clickedMethod === "github" ? <Spinner /> : <Github />}
            Continue with Github
        </Button>
    );
}
