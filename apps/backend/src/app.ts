import environment from "@environment";
import morgan from "@morgan";
import compression from "compression";
import cors from "cors";
import express, { Express } from "express";
import helmet from "helmet";

const app: Express = express();

if (environment.NODE_ENV != "production") {
    app.use(morgan);
}

app.use(helmet());
app.use(express.json());
app.use(compression());
app.use(
    cors({
        origin: [environment.CLIENT_URL],
        credentials: true
    })
);

export default app;
