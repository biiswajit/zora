import { ErrorCodes } from "@/types";
import { createError } from "@/utils";

export type UnprocessableErrorExtensions = {
    reason: string;
    suggestion?: string;
};

export const UnprocessableError = createError<UnprocessableErrorExtensions>(
    ErrorCodes.Unprocessable,
    "The request payload contains invalid data",
    422,
);
