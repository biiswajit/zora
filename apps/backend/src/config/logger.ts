import winston from "winston";
import environment from "./environment";

const levels = {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    http: 4,
    debug: 5,
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
    level: environment.NODE_ENV === "development" ? "debug" : "warn",
    levels,
    format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.splat(),
        winston.format.printf((info) => {
            const { timestamp, level, message, ...meta } = info;
            return `${timestamp} : [${level}] : ${message} ${Object.keys(meta).length ? JSON.stringify(meta) : ""}`;
        }),
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
