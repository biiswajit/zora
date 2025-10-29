import { json, type RequestHandler } from "express";
import environment from "@/config/environment";
import { InvalidPayloadError } from "@/errors/index";

const bodyParser: RequestHandler = (req, res, next) => {
    json({
        limit: environment.MAX_PAYLOAD_SIZE,
    })(req, res, (err) => {
        if (err) {
            return next(
                new InvalidPayloadError({
                    reason: err.message,
                }),
            );
        }

        return next();
    });
};

export default bodyParser;
