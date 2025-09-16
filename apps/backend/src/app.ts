import env from "@environment";
import morgan from "@morgan";
import router from "@router";
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
        origin: [env.CLIENT_URL],
        credentials: true,
    }),
);
app.use(express.json());
app.use(compression());

app.use("/v1", router);

export default app;
