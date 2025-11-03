import type { ZodOpenApiPathsObject } from "zod-openapi";
import { checkWorkspaceSlug } from "./check-workspace-slug";

export const miscPaths: ZodOpenApiPathsObject = {
    "/misc/check-workspace-slug": {
        get: checkWorkspaceSlug,
    },
};
