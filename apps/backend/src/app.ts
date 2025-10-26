import { toNodeHandler } from "better-auth/node";
import compression from "compression";
import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";
import environment from "@/config/environment";
import morgan from "@/config/morgan";
import { errorHandler } from "@/middlewares/error-handler";
import { respond } from "@/middlewares/respond";
import router from "@/router";
import auth from "@/utils/auth";
import { InvalidPayloadError } from "./errors/index";

const app: Express = express();

if (environment.NODE_ENV === "development") {
    app.use(morgan);
}

// TODO: make a seperate file in middlewares folder
app.use(helmet());

if (environment.CORS_ENABLED) {
    // TODO: make a seperate file in middlewares folder
    app.use(
        cors({
            origin: [environment.WEB_CLIENT_URL, environment.WEB_DOC_URL],
            credentials: true,
        }),
    );
}

app.all("/auth/*splat", toNodeHandler(auth));

app.use((req, res, next) => {
    express.json({
        limit: environment.MAX_PAYLOAD_SIZE,
    })(req, res, (err) => {
        if (err) {
            return next(
                new InvalidPayloadError({
                    reason: err.message,
                }),
            );
        }

        return next();
    });
});

app.use(compression());

app.use("/", router);

app.use(respond);
app.use(errorHandler);

export default app;
