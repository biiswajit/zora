import cors from "cors";
import type { RequestHandler } from "express";
import environment from "@/config/environment";

let corsMiddleware: RequestHandler = (_req, _res, next) => next();

if (environment.CORS_ENABLED === true) {
    corsMiddleware = cors({
        origin: environment.CORS_ORIGIN_WEB,
        methods: environment.CORS_METHODS,
        credentials: environment.CORS_CREDENTIALS,
    });
}

export { corsMiddleware };
