import env from "@environment";
import winston from "winston";

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};

const colors = {
    error: "red",
    warn: "yellow",
    info: "green",
    http: "magenta",
    debug: "white",
};

winston.addColors(colors);

const logger = winston.createLogger({
    level: env.NODE_ENV === "development" ? "debug" : "warn",
    levels,
    format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.printf((info) => `${[info.timestamp]}: ${info.level}: ${info.message}`),
    ),
    transports: [
        new winston.transports.File({
            level: "error",
            filename: "logs/error.log",
            maxsize: 10000000,
            maxFiles: 10,
        }),
        new winston.transports.File({
            filename: "logs/combined.log",
            maxsize: 10000000,
            maxFiles: 10,
        }),
        new winston.transports.Console({
            format: winston.format.combine(winston.format.colorize({ all: true })),
        }),
    ],
});

export default logger;
