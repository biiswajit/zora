import type { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { generateErrorMessage } from "zod-error";
import logger from "@/config/logger";
import { InternalError } from "@/errors";
import { ErrorCodes, type StandardResponse } from "@/types";
import { asyncErrorHandler, getHttpContext } from "@/utils";

const FALLBACK_ERROR = new InternalError();

const logTheseErrors = [ErrorCodes.Internal];

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
                            transform: ({ value }) => {
                                const messages = value.split(":");
                                return messages[1] ? messages[1] : value;
                            },
                        },
                    }),
                },
            },
        } as StandardResponse);
    }

    if (err.name === "ZoraError") {
        if (logTheseErrors.includes(err.code)) {
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

    if (err.code === "P2002") {
        res.status(409);
        return res.json({
            status: "error",
            error: {
                status: 409,
                code: ErrorCodes.Conflict,
                message: "Resource already exists",
            },
        } as StandardResponse);
    }

    if (err.code === "P2025") {
        res.status(404);
        return res.json({
            status: "error",
            error: {
                status: 404,
                code: ErrorCodes.NotFound,
                message: "Resource not found",
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
