import morgan from "morgan";
import logger from "./logger";

const morganConfig = morgan("combined", {
    stream: { write: (message) => logger.http(message.trim()) },
});

export default morganConfig;
