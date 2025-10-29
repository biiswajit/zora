import * as z from "zod";
import { colorSchema, roleSchema, slugSchema } from "./misc";

const workspaceSchema = z.object({
    id: z.cuid(),
    name: z.string(),
    slug: z.string(),
    color: z.string(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable(),
    users: z.array(
        z.object({
            name: z.string(),
            email: z.email(),
            image: z.url(),
            role: roleSchema,
            joinedOn: z.date(),
        }),
    ),
});

const createWorkspaceSchema = z.object({
    name: z.string().min(2).max(32),
    slug: slugSchema,
    color: colorSchema,
});

export { workspaceSchema, createWorkspaceSchema };
