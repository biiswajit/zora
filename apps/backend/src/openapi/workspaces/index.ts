import type { ZodOpenApiPathsObject } from "zod-openapi";
import { getWorkspaces } from "./get-workspaces";

export const workspacesPaths: ZodOpenApiPathsObject = {
    "/customers": {
        get: getWorkspaces,
    },
};
