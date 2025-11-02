import type { ErrorRequestHandler } from "express";
import logger from "@/config/logger";
import { InternalServerError } from "@/errors/index";
import type { StandardError } from "@/types/error";
import type { StandardResponse } from "@/types/respond";
import asyncErrorHandler from "@/utils/async-error-handler";
import { getHttpContext } from "../utils";

const FALLBACK_ERROR = new InternalServerError();

export const errorHandler: ErrorRequestHandler = asyncErrorHandler(async (err, req, res) => {
    const errors: StandardError[] = [];
    let status: number | null = null;

    const receivedErrors = Array.isArray(err) ? err : [err];

    for (const error of receivedErrors) {
        let message: string = "";

        if (error.name === "ZoraError") {
            logger.debug("something went wrong", {
                http: getHttpContext(req),
                error: {
                    ...error,
                    stack: error.stack,
                },
            });

            if (status === null) status = error.status;
            else if (status !== error.status) status = FALLBACK_ERROR.status;

            message = error.message;
        } else {
            logger.error(error);

            status = FALLBACK_ERROR.status;

            message = FALLBACK_ERROR.message;
        }

        errors.push({
            message: message,
            extensions: {
                ...(error.extensions ?? {}),
                code: error.code ?? FALLBACK_ERROR.code,
            },
        });
    }

    res.status(status ?? FALLBACK_ERROR.status);

    return res.json({
        status: "error",
        errors: errors,
    } as StandardResponse);
});
