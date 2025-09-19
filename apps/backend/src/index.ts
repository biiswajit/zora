import env from "@environment";
import logger from "@logger";
import app from "./app";

app.listen(env.PORT_NUMBER, () => {
    logger.info(`API server on ${env.NODE_ENV === "development" ? "http" : "https"}://${env.HOST}:${env.PORT_NUMBER}`);
});
