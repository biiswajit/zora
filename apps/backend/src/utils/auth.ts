import env from "@environment";
import { prisma } from "@zora/prisma";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

const auth = betterAuth({
    secret: env.BETTER_AUTH_SECRET,
    baseURL: env.BETTER_AUTH_URL,
    basePath: "/auth",
    trustedOrigins: [env.WEB_CLIENT_URL],
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    // TODO: add secondary storage
    databaseHooks: {
        user: {
            create: {
                before: async (user) => {
                    return {
                        data: {
                            ...user,
                            firstName: user.name.split(" ")[0],
                            lastName: user.name.split(" ")[1],
                        },
                    };
                },
            },
        },
    },
    socialProviders: {
        // TODO: add more social sign-on if needed
        google: {
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET,
        },
        notion: {
            clientId: env.NOTION_CLIENT_ID,
            clientSecret: env.NOTION_CLIENT_SECRET,
        },
    },
    advanced: {
        database: {
            generateId: false,
        },
    },
});

export default auth;
