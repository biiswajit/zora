import { prisma } from "@zora/prisma";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { lastLoginMethod } from "better-auth/plugins";
import environment from "@/config/environment";

// NOTE: right now using cookie cache in future use secondary storage like redis

export const auth = betterAuth({
    secret: environment.BETTER_AUTH_SECRET,
    baseURL: environment.BETTER_AUTH_URL,
    basePath: "/auth",
    trustedOrigins: [environment.CORS_ORIGIN_WEB],
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
    session: {
        cookieCache: {
            enabled: true,
            maxAge: 15 * 60,
        },
    },
    advanced: {
        cookies: {
            session_token: {
                name: "session_token",
            },
            session_data: {
                name: "session_data",
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
