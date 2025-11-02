import { toNodeHandler } from "better-auth/node";
import compression from "compression";
import cookieParser from "cookie-parser";
import express, { type Express } from "express";
import helmet from "helmet";
import environment from "@/config/environment";
import morgan from "@/config/morgan";
import { bodyParser, corsMiddleware, errorHandler, respond } from "@/middlewares";
import router from "@/router";
import { auth } from "@/utils";

const app: Express = express();

if (environment.NODE_ENV === "development") {
    app.use(morgan);
}

// TODO: make a seperate file in middlewares folder
app.use(helmet());

app.use(corsMiddleware);

app.all("/auth/*splat", toNodeHandler(auth));

app.use(bodyParser);

app.use(cookieParser());

app.use(compression());

app.use("/", router);

app.use(respond);

app.use(errorHandler);

export default app;
