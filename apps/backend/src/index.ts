import logger from "@/config/logger";
import { startServer, stopServer } from "./server";

const server = startServer();

process.on("uncaughtException", (error) => {
    logger.error("Server is closing due to unexpected exception", error);
    stopServer(server, true);
});

process.on("unhandledRejection", (error) => {
    logger.error("Server is closing due to unhandled exception", error);
    stopServer(server, true);
});

process.on("SIGTERM", () => {
    logger.info("SIGTERM signal received stopping the server");
    if (server) {
        stopServer(server, false);
    }
});

process.on("SIGINT", () => {
    logger.info("SIGINT signal received stopping the server");
    if (server) {
        stopServer(server, false);
    }
});
