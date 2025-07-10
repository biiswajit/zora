import swaggerUI from "swagger-ui-express";
import yaml from "yaml";
import fs from "fs";
import path from "path";
import app from "./app";
import environment from "@environment";
import logger from "@logger";

const specPath = path.resolve(__dirname, "../openapi/spec.yaml");
const file = fs.readFileSync(specPath, "utf8");
const openapiSpec = yaml.parse(file);

app.use("/internal-docs", swaggerUI.serve, swaggerUI.setup(openapiSpec));

app.listen(environment.PORT, () => {
  logger.info(`Zora API server is listening on ${environment.NODE_ENV === "development" ? "http" : "https"}://${environment.HOST}/${environment.PORT}`);
  logger.info(`Zora internal API reference is listening on ${environment.NODE_ENV === "development" ? "http" : "https"}://${environment.HOST}/${environment.PORT}/internal-docs`)
});