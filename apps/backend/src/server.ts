import type { Server } from "node:http";
import environment from "@/config/environment";
import logger from "@/config/logger";
import app from "./app";

export function startServer(): Server {
    const server = app.listen(environment.PORT_NUMBER, () => {
        environment.SERVER_ONLINE = true;
        const protocol = environment.NODE_ENV === "development" ? "http" : "https";
        // NOTE: additional starups goes here
        logger.info(
            `Server listening on ${protocol}://${environment.HOST}:${environment.PORT_NUMBER}`,
        );
    });

    server.on("error", (error: NodeJS.ErrnoException) => {
        if (error.code === "EADDRINUSE") {
            logger.error(`${environment.PORT_NUMBER} already in use.`);
        } else {
            logger.error("Server failed to start", error);
        }

        process.exit(1);
    });

    return server;
}

export function stopServer(server: Server, unexpected: boolean): void {
    server.close(() => {
        logger.warn("Server is closed now");
        // NOTE: additional service closing goes here
        process.exit(unexpected ? 1 : 0);
    });
}
