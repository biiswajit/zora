import type { ZodOpenApiResponseObject } from "zod-openapi";
import type { ErrorCodes } from "@/types";

export function errorResponseSchemaWrapper(
    code: ErrorCodes,
    description: string,
): ZodOpenApiResponseObject {
    return {
        description: description,
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    required: ["status", "error"],
                    properties: {
                        status: {
                            type: "string",
                            enum: ["error"],
                            description: "Always `error` for failure responses",
                        },
                        error: {
                            type: "object",
                            required: ["message", "code", "status"],
                            properties: {
                                message: {
                                    type: "string",
                                    description: "A human-readable message about the error",
                                    example: "Authorization is required to access this resource",
                                },
                                code: {
                                    type: "string",
                                    enum: [code],
                                    description:
                                        "Our platform specific error code for debuging purposes",
                                    example: code,
                                },
                                status: {
                                    type: "number",
                                    description: "Corrosponding HTTP status code for the error",
                                    example: 401,
                                },
                                extensions: {
                                    type: "object",
                                    description:
                                        "Some extra information about the error for debuging purposes",
                                },
                            },
                        },
                    },
                },
            },
        },
    };
}
