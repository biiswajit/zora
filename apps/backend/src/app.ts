import environment from "@environment";
import morgan from "@morgan";
import express, { Express } from "express";

const app: Express = express();

if (environment.NODE_ENV != "production") {
    app.use(morgan);
}

export default app;
