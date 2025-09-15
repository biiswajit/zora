import logger from "@logger";
import morgan from "morgan";

const morganConfig = morgan("combined", {
    stream: { write: (message) => logger.http(message.trim()) },
});

export default morganConfig;
