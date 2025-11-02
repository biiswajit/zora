import { json, type RequestHandler } from "express";
import environment from "@/config/environment";
import { UnprocessableError } from "@/errors";

export const bodyParser: RequestHandler = (req, res, next) => {
    json({
        limit: environment.MAX_PAYLOAD_SIZE,
    })(req, res, (err) => {
        if (err) {
            return next(
                new UnprocessableError({
                    reason: err.message,
                    suggestion: `Payload size must be within ${environment.MAX_PAYLOAD_SIZE}`,
                }),
            );
        }

        return next();
    });
};
