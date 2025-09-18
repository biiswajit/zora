import "dotenv/config";
import * as z from "zod";

const envSchema = z.object({
    NODE_ENV: z.enum(["development", "production", "testing"]).default("development"),
    PORT_NUMBER: z.string().default("8080"),
    HOST: z.string().default("localhost"),
    WEB_CLIENT_URL: z.url().default("http://localhost:3000"),
    BETTER_AUTH_SECRET: z.string().default("something_secure"),
    BETTER_AUTH_URL: z.string().default("http://localhost:8080"),
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    NOTION_CLIENT_ID: z.string(),
    NOTION_CLIENT_SECRET: z.string(),
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
    BETTER_AUTH_SECRET: env.BETTER_AUTH_SECRET,
    BETTER_AUTH_URL: env.BETTER_AUTH_URL,
    GOOGLE_CLIENT_ID: env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: env.GOOGLE_CLIENT_SECRET,
    NOTION_CLIENT_ID: env.NOTION_CLIENT_ID,
    NOTION_CLIENT_SECRET: env.NOTION_CLIENT_SECRET,
};
