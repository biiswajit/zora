import type { IncomingHttpHeaders } from "node:http";
import { fromNodeHeaders } from "better-auth/node";
import { InvalidCredentialsError } from "@/errors/index";
import auth from "./auth";

export default async function getSessionOrThrow(
    headers: IncomingHttpHeaders,
    disableCookieCache: boolean = false,
) {
    const res = await auth.api.getSession({
        headers: fromNodeHeaders(headers),
        query: {
            disableCookieCache: disableCookieCache,
        },
    });

    if (!res) {
        throw new InvalidCredentialsError();
    }

    return res;
}
