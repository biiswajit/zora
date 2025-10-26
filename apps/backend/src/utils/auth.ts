import { prisma } from "@zora/prisma";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { lastLoginMethod } from "better-auth/plugins";
import env from "@/config/environment";

const auth = betterAuth({
    secret: env.BETTER_AUTH_SECRET,
    baseURL: env.BETTER_AUTH_URL,
    basePath: "/auth",
    trustedOrigins: [env.WEB_CLIENT_URL],
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    // TODO: add secondary storage
    socialProviders: {
        // TODO: add more social sign-on if needed
        google: {
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET,
        },
        github: {
            clientId: env.GITHUB_CLIENT_ID,
            clientSecret: env.GITHUB_CLIENT_SECRET,
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
