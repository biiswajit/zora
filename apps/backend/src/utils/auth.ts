import { prisma } from "@zora/prisma";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { lastLoginMethod } from "better-auth/plugins";
import environment from "@/config/environment";

const auth = betterAuth({
    secret: environment.BETTER_AUTH_SECRET,
    baseURL: environment.BETTER_AUTH_URL,
    basePath: "/auth",
    trustedOrigins: [environment.WEB_CLIENT_URL],
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    // TODO: add secondary storage
    socialProviders: {
        // TODO: add more social sign-on if needed
        google: {
            clientId: environment.GOOGLE_CLIENT_ID,
            clientSecret: environment.GOOGLE_CLIENT_SECRET,
        },
        github: {
            clientId: environment.GITHUB_CLIENT_ID,
            clientSecret: environment.GITHUB_CLIENT_SECRET,
        },
    },
    advanced: {
        cookies: {
            session_token: {
                name: "session_token",
            },
        },
    },
    plugins: [
        lastLoginMethod({
            cookieName: "last_used_login_method",
            storeInDatabase: false,
        }),
    ],
});

export default auth;
