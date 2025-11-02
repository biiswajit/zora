import type { ErrorRequestHandler } from "express";
import logger from "@/config/logger";
import { InternalError } from "@/errors";
import type { StandardResponse } from "@/types";
import { getHttpContext } from "./get-http-context";

export function asyncErrorHandler(
    fn: (...args: Parameters<ErrorRequestHandler>) => Promise<unknown>,
): (...args: Parameters<ErrorRequestHandler>) => Promise<ReturnType<ErrorRequestHandler>> {
    return (err, req, res, next) =>
        fn(err, req, res, next).catch((error) => {
            try {
                logger.error("An error occured in error handler middleware", {
                    http: getHttpContext(req),
                    error: {
                        ...error,
                        stack: error.stack,
                    },
                });
            } catch {
                // NOTE: ignore
            }

            // NOTE: it is recommanded to delegate the error handing to express where response headers already sent
            if (res.headersSent) return next(error);

            const FALLBACK_ERROR = new InternalError();

            res.status(FALLBACK_ERROR.status);

            return res.json({
                status: "error",
                error: {
                    code: FALLBACK_ERROR.code,
                    status: FALLBACK_ERROR.status,
                    message: FALLBACK_ERROR.message,
                    extensions: FALLBACK_ERROR.extensions ?? undefined,
                },
            } as StandardResponse);
        });
}
