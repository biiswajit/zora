import { signOut } from "./auth-client";
import { redirect } from "next/navigation";
import { AFTER_SIGNOUT_REDIRECT_TO, ERROR_URL } from "@/constants/urls";

export async function handleSignOut() {
  try {
    const { error } = await signOut({
      fetchOptions: {
        onSuccess: () => {
          redirect(AFTER_SIGNOUT_REDIRECT_TO);
        },
      },
    });

    if (error) {
      throw new Error("error while signout" + error);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    redirect(ERROR_URL);
  }
}
