import swaggerUI from "swagger-ui-express";
import yaml from "yaml";
import fs from "fs";
import path from "path";
import app from "./app";
import env from "@environment";

const specPath = path.resolve(__dirname, "../openapi/spec.yaml");
const file = fs.readFileSync(specPath, "utf8");
const openapiSpec = yaml.parse(file);

app.use("/docs", swaggerUI.serve, swaggerUI.setup(openapiSpec));

app.listen(env.PORT, () => {
  console.log(`Zora API server is listening on ${env.HOST}/${env.PORT}}`);
  console.log(`Zora internal API documentation is listening on ${env.HOST}/${env.PORT}/docs`)
});