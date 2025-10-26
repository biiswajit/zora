import type { ErrorRequestHandler } from "express";
import logger from "@/config/logger";
import { InternalServerError } from "@/errors/index";
import type { StandardError } from "@/types/error";
import type { StandardResponse } from "@/types/respond";

const FALLBACK_ERROR = new InternalServerError();

export default function asyncErrorHandler(
    fn: (...args: Parameters<ErrorRequestHandler>) => Promise<unknown>,
): (...args: Parameters<ErrorRequestHandler>) => Promise<ReturnType<ErrorRequestHandler>> {
    return (err, req, res, next) =>
        fn(err, req, res, next).catch((error) => {
            try {
                logger.error("Unknown error", error);
            } catch {
                // NOTE: ignore
            }

            // NOTE: it is recommanded to delegate the error handing to express where response headers already sent
            if (res.headersSent) return next(error);

            res.status(FALLBACK_ERROR.status);
            return res.json({
                status: "error",
                errors: [
                    {
                        message: FALLBACK_ERROR.message,
                        extensions: {
                            code: FALLBACK_ERROR.code,
                        },
                    },
                ] as StandardError[],
            } as StandardResponse);
        });
}
