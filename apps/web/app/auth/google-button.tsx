import { Button } from "@zora/ui/web/components/button";
import { Spinner } from "@zora/ui/web/components/spinner";
import { Google } from "@zora/ui/web/icons/google";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { signIn } from "@/utils/auth-client";
import type { AuthButtonProps } from "./form";

export function GoogleButton({ clickedMethod, setClickedMethod }: AuthButtonProps) {
    const router = useRouter();

    return (
        <Button
            variant="outline"
            disabled={clickedMethod !== undefined}
            onClick={async () => {
                await signIn.social({
                    provider: "google",
                    fetchOptions: {
                        onRequest() {
                            setClickedMethod("google");
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
            {clickedMethod === "google" ? <Spinner /> : <Google />}
            Continue with Google
        </Button>
    );
}
