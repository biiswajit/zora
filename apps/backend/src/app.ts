import express, { Express } from "express";
import morgan from "@morgan";
import environment from "@environment";

const app: Express = express();

if (environment.NODE_ENV != "production") {
  app.use(morgan);
}

export default app;
