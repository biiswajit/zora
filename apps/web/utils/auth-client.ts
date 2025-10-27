import { createAuthClient } from "better-auth/client";
import { lastLoginMethodClient } from "better-auth/client/plugins";

const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080",
    basePath: "/auth",
    fetchOptions: {
        credentials: "include",
    },
    plugins: [
        lastLoginMethodClient({
            cookieName: "last_used_login_method",
        }),
    ],
});

export const { signIn, signOut, signUp, useSession, getLastUsedLoginMethod } = authClient;
