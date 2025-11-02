import { ErrorCodes } from "@/types";
import { createError } from "@/utils";

export const UnauthorizedError = createError(
    ErrorCodes.Unauthorized,
    "Authentication is required to access this resource",
    401,
);
