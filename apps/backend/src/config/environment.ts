import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
    APP_NAME: z.string(),
    NODE_ENV: z.enum(["development", "test", "production"]),
    HOST: z.string(),
    PORT: z.string().default("8080").transform(Number)
});

const { success, data: env, error } = envSchema.safeParse(process.env);
if (!success) {
    throw new Error(`Environment variable config error: ${JSON.stringify(error.issues)}`);
}

export default {
    APP_NAME: env.APP_NAME,
    NODE_ENV: env.NODE_ENV,
    HOST: env.HOST,
    PORT: env.PORT
};
