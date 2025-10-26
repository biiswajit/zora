import * as z from "zod";

export const workspaceSchema = z.object({
    id: z.cuid().describe("Unique ID for the workspace"),
    name: z.string(),
    description: z.string().optional(),
    slug: z.string().max(48).describe("At most 48 characters long unique slug for workspace"),
    color: z.string().startsWith("#").describe("HEX color code for workspace"),
});
