import { slugSchema } from "@zora/utils";
import * as z from "zod";
import type { ZodOpenApiOperationObject } from "zod-openapi";
import { errorResponses } from "../errors";

const responseSchema = z.object({
    success: z.literal("success"),
    data: z.object({
        is_avaliable: z.boolean(),
        is_valid_format: z.boolean(),
        suggestion: z.string().optional(),
    }),
});

export const checkWorkspaceSlug: ZodOpenApiOperationObject = {
    operationId: "checkWorkspaceSlug",
    description: "Checks the requested slug is correctly formatted and avaliable to use or not",
    summary: "Check workspace slug",
    tags: ["Workspaces"],
    security: [{ sessionAuth: [] }],
    requestParams: {
        query: z.object({
            slug: slugSchema,
        }),
    },
    responses: {
        "200": {
            description: "Slug format and avaliablity check",
            content: {
                "application/json": {
                    schema: responseSchema,
                },
            },
        },
        ...errorResponses,
    },
};
