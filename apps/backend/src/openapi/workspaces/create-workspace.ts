import { createWorkspaceSchema, workspaceSchema } from "@zora/utils";
import * as z from "zod";
import type { ZodOpenApiOperationObject } from "zod-openapi";
import { errorResponses } from "../errors";

const responseSchema = z.object({
    success: z.literal("success"),
    data: workspaceSchema,
});

export const createWorkspace: ZodOpenApiOperationObject = {
    description: "Create a new workspace for current authenticated user",
    summary: "Create a new workspace",
    operationId: "createWorkspace",
    tags: ["Workspaces"],
    security: [{ sessionAuth: [] }],
    requestBody: {
        content: {
            "application/json": {
                schema: createWorkspaceSchema,
            },
        },
    },
    responses: {
        "200": {
            description: "Get the newly created workspace",
            content: {
                "application/json": {
                    schema: responseSchema,
                },
            },
        },
        ...errorResponses,
    },
};
