import type { ZodOpenApiComponentsObject } from "zod-openapi";
import { ErrorCodes } from "@/types";
import { errorResponseSchemaWrapper } from "@/utils";

export const errorResponses: ZodOpenApiComponentsObject["responses"] = {
    "401": errorResponseSchemaWrapper(
        ErrorCodes.Unauthorized,
        "The client did not provide valid credentials (e.g., a missing or invalid token) or the user is not authorized to access this resource",
    ),
    "404": errorResponseSchemaWrapper(
        ErrorCodes.NotFound,
        "The server could not locate a resource matching the requested URI. This usually means the resource was never created or has been deleted",
    ),
    "409": errorResponseSchemaWrapper(
        ErrorCodes.Conflict,
        "The request could not be completed because it would violate a unique constraint or business rule. This typically occurs when trying to create a resource that already exists (e.g., a user with an email that is already registered)",
    ),
    "422": errorResponseSchemaWrapper(
        ErrorCodes.Unprocessable,
        "The request was well-formed but was unable to be followed due to semantic errors. This means the request payload contains invalid data types, missing required fields, or values that fail validation rules",
    ),
    "500": errorResponseSchemaWrapper(
        ErrorCodes.Internal,
        "An unexpected condition was encountered on the server. This indicates an unhandled exception or an infrastructure issue that is preventing the request from being fulfilled",
    ),
};
