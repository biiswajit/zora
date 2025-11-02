import { workspaceSchema } from "@zora/utils";
import * as z from "zod";
import type { ZodOpenApiOperationObject } from "zod-openapi";
import { errorResponses } from "../errors";

const responseSchema = z.object({
    success: z.literal("success"),
    data: z.array(workspaceSchema),
});

export const getWorkspaces: ZodOpenApiOperationObject = {
    operationId: "getWorkspaces",
    description: "Retrieves a list of all workspaces for current authenticated user",
    summary: "Get all workspaces",
    tags: ["Workspaces"],
    security: [{ sessionAuth: [] }],
    responses: {
        "200": {
            description: "List of workspaces",
            content: {
                "application/json": {
                    schema: responseSchema,
                },
            },
        },
        ...errorResponses,
    },
};
