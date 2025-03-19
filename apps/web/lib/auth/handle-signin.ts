import { signIn } from "./auth-client";
import { redirect } from "next/navigation";
import { EXISTING_USER_REDIRECT_TO, NEW_USER_REDIRECT_TO, ERROR_URL } from "@/constants/urls";
import { OAUTH_PROVIDERS } from "@/constants/types";

export async function handleSignIn(provider: OAUTH_PROVIDERS) {
  try {
    const { error } = await signIn.social({
      provider: provider,
      callbackURL: EXISTING_USER_REDIRECT_TO,
      errorCallbackURL: ERROR_URL,
      newUserCallbackURL: NEW_USER_REDIRECT_TO,
      disableRedirect: false,
    });

    if (error) {
      throw new Error("error while signin" + error);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    redirect(ERROR_URL);
  }
}
