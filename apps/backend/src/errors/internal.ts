import { createError } from "./create-error";
import { ErrorCode } from "./error-codes";

// NOTE: do not share internal info on message since it will be sent to public
export const InternalServerError = createError(
    ErrorCode.Internal,
    "An unexpected error occured on our side",
    500,
);
