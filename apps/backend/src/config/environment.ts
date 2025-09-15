import "dotenv/config";
import * as z from "zod";

const envSchema = z.object({
    NODE_ENV: z.enum(["development", "production", "testing"]).default("development"),
    PORT_NUMBER: z.string().default("8080"),
    HOST: z.string().default("localhost"),
    CLIENT_URL: z.url().default("http://localhost:3000"),
});

const { data: env, success, error } = envSchema.safeParse(process.env);

if (!success) {
    throw new Error(`Environment variable config error: ${JSON.stringify(error.issues)}`);
}

export default {
    NODE_ENV: env.NODE_ENV,
    PORT_NUMBER: env.PORT_NUMBER,
    HOST: env.HOST,
    CLIENT_URL: env.CLIENT_URL,
};
