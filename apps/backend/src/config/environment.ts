import "dotenv/config";
import * as z from "zod";

const envSchema = z.object({
    NODE_ENV: z.enum(["development", "production", "testing"]).default("development"),
    PORT_NUMBER: z
        .string()
        .default("8080")
        .transform((str) => parseInt(str, 10)),
    HOST: z.string().default("localhost"),
    WEB_CLIENT_URL: z.url().default("http://localhost:3000"),
    WEB_DOC_URL: z.url().default("http://localhost:3001"),
    CORS_ENABLED: z
        .string()
        .default("false")
        .transform((enabled) => enabled === "true"),
    MAX_PAYLOAD_SIZE: z.string().default("100kb"),
    SERVER_ONLINE: z
        .string()
        .default("false")
        .transform((online) => online === "true"),
    APP_NAME: z.string().default("zora"),
    BETTER_AUTH_SECRET: z.string().default("something_secure"),
    BETTER_AUTH_URL: z.string().default("http://localhost:8080"),
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    GITHUB_CLIENT_ID: z.string(),
    GITHUB_CLIENT_SECRET: z.string(),
});

const { data: env, success, error } = envSchema.safeParse(process.env);

if (!success) {
    throw new Error(`Environment variable config error: ${JSON.stringify(error.issues)}`);
}

export default {
    NODE_ENV: env.NODE_ENV,
    PORT_NUMBER: env.PORT_NUMBER,
    HOST: env.HOST,
    WEB_CLIENT_URL: env.WEB_CLIENT_URL,
    WEB_DOC_URL: env.WEB_DOC_URL,
    CORS_ENABLED: env.CORS_ENABLED,
    MAX_PAYLOAD_SIZE: env.MAX_PAYLOAD_SIZE,
    SERVER_ONLINE: env.SERVER_ONLINE,
    APP_NAME: env.APP_NAME,
    BETTER_AUTH_SECRET: env.BETTER_AUTH_SECRET,
    BETTER_AUTH_URL: env.BETTER_AUTH_URL,
    GOOGLE_CLIENT_ID: env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: env.GOOGLE_CLIENT_SECRET,
    GITHUB_CLIENT_ID: env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: env.GITHUB_CLIENT_SECRET,
};
