import { ErrorCodes } from "@/types";
import { createError } from "@/utils";

// NOTE: do not share internal info on message since it will be sent to public
export const InternalError = createError(
    ErrorCodes.Internal,
    "An unexpected error occured on our side",
    500,
);
