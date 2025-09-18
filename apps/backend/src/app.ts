import env from "@environment";
import morgan from "@morgan";
import router from "@router";
import auth from "@utils/auth";
import { toNodeHandler } from "better-auth/node";
import compression from "compression";
import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";

const app: Express = express();

if (env.NODE_ENV !== "production") {
    app.use(morgan);
}

app.use(helmet());
app.use(
    cors({
        origin: [env.WEB_CLIENT_URL],
        credentials: true,
    }),
);
app.all("/auth/*splat", toNodeHandler(auth));
app.use(express.json());
app.use(compression());
app.use("/", router);

export default app;
