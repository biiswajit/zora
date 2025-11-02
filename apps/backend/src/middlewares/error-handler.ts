import type { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { generateErrorMessage } from "zod-error";
import logger from "@/config/logger";
import { InternalError } from "@/errors";
import { ErrorCodes, type StandardResponse } from "@/types";
import { asyncErrorHandler, ERRORS_TO_LOG, getHttpContext } from "@/utils";

const FALLBACK_ERROR = new InternalError();

export const errorHandler: ErrorRequestHandler = asyncErrorHandler(async (err, req, res) => {
    err = Array.isArray(err) ? err[0] : err;

    if (err instanceof ZodError) {
        res.status(422);
        return res.json({
            status: "error",
            error: {
                status: 422,
                code: ErrorCodes.Unprocessable,
                message: "The request payload contains invalid data",
                extensions: {
                    reason: generateErrorMessage(err.issues, {
                        maxErrors: 1,
                        delimiter: {
                            component: "",
                        },
                        path: {
                            enabled: true,
                            type: "objectNotation",
                            label: "",
                        },
                        code: {
                            enabled: false,
                        },
                        message: {
                            enabled: true,
                            transform: (msg) => msg.value,
                        },
                    }),
                },
            },
        } as StandardResponse);
    }

    if (err.name === "ZoraError") {
        if (ERRORS_TO_LOG.includes(err.code)) {
            logger.error("Zora error", {
                http: getHttpContext(req),
                error: {
                    ...err,
                    stack: err.stack,
                },
            });
        }

        res.status(err.status);
        return res.json({
            status: "error",
            error: {
                status: err.status,
                code: err.code,
                message: err.message,
                extensions: err.extensions,
            },
        } as StandardResponse);
    }

    logger.error("Unknown error", {
        http: getHttpContext(req),
        error: {
            ...err,
            stack: err.stack,
        },
    });

    res.status(FALLBACK_ERROR.status);
    return res.json({
        status: "error",
        error: {
            status: FALLBACK_ERROR.status,
            code: FALLBACK_ERROR.code,
            message: FALLBACK_ERROR.message,
            extensions: FALLBACK_ERROR.extensions,
        },
    } as StandardResponse);
});
