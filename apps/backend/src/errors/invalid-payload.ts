import { createError } from "./create-error";
import { ErrorCode } from "./error-codes";

export interface InvalidPayloadErrorExtensions {
    reason: string;
}

export const InvalidPayloadError = createError<InvalidPayloadErrorExtensions>(
    ErrorCode.InvalidPayload,
    "Invalid payload received",
    400,
);
