import type { ZodOpenApiPathsObject } from "zod-openapi";
import { createWorkspace } from "./create-workspace";
import { getWorkspaces } from "./get-workspaces";

export const workspacesPaths: ZodOpenApiPathsObject = {
    "/customers": {
        get: getWorkspaces,
        post: createWorkspace,
    },
};
