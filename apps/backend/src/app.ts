import { toNodeHandler } from "better-auth/node";
import compression from "compression";
import cookieParser from "cookie-parser";
import express, { type Express } from "express";
import helmet from "helmet";
import environment from "@/config/environment";
import morgan from "@/config/morgan";
import bodyParser from "@/middlewares/body-parser";
import cors from "@/middlewares/cors";
import { errorHandler } from "@/middlewares/error-handler";
import { respond } from "@/middlewares/respond";
import router from "@/router";
import auth from "@/utils/auth";

const app: Express = express();

if (environment.NODE_ENV === "development") {
    app.use(morgan);
}

// TODO: make a seperate file in middlewares folder
app.use(helmet());

app.use(cors);

app.all("/auth/*splat", toNodeHandler(auth));

app.use(bodyParser);

app.use(cookieParser());

app.use(compression());

app.use("/", router);

app.use(respond);

app.use(errorHandler);

export default app;
