import fs from "node:fs";
import path from "node:path";
import env from "@environment";
import logger from "@logger";
import swaggerUI from "swagger-ui-express";
import yaml from "yaml";
import app from "./app";

const specPath = path.resolve(__dirname, "../openapi/spec.yml");
const file = fs.readFileSync(specPath, "utf8");
const openapiSpec = yaml.parse(file);

app.use("/reference", swaggerUI.serve, swaggerUI.setup(openapiSpec));

app.listen(env.PORT_NUMBER, () => {
    logger.info(`API server on ${env.NODE_ENV === "development" ? "http" : "https"}://${env.HOST}:${env.PORT_NUMBER}`);
    logger.info(
        `API reference on ${env.NODE_ENV === "development" ? "http" : "https"}://${env.HOST}:${env.PORT_NUMBER}/reference`,
    );
});
