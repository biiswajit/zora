import { createError } from "./create-error";
import { ErrorCode } from "./error-codes";

export const InvalidCredentialsError = createError(
    ErrorCode.InvalidCredentials,
    "User credentials are invalid",
    401,
);
