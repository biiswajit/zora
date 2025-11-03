import slugify from "@sindresorhus/slugify";
import * as z from "zod";
import { validSlugRegex } from "../functions";

const roleSchema = z
    .enum(["owner", "member"])
    .describe("Role of authenticated user in a workspace");

const colorSchema = z
    .enum(["default", "red", "orange", "yellow", "green", "blue", "purple", "gray"])
    .optional()
    .describe("Hex color code for workspaces");

const slugSchema = z
    .string()
    .min(3)
    .max(48)
    .transform((slug) => slugify(slug))
    .refine((slug) => validSlugRegex().test(slug))
    .describe("Slugs are user defined custom string to uniquely identify workspaces");

type Color = z.infer<typeof colorSchema>;

export type { Color };
export { roleSchema, colorSchema, slugSchema };
