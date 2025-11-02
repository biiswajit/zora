import { prisma } from "@zora/prisma";
import { slugSchema } from "@zora/utils";
import { Router } from "express";
import { InternalServerError, InvalidPayloadError } from "@/errors";
import { asyncHandler, getSessionOrThrow } from "@/utils";

const router: Router = Router();

router.get(
    "/health",
    asyncHandler((_req, _res, _next) => {
        // res.locals.payload = "Server is ready to serve";
        // res.locals.meta = {
        //     version: "0.0.0",
        // };

        // next();
        throw new InternalServerError();
    }),
);

router.get(
    "/me",
    asyncHandler(async (req, res, next) => {
        const session = await getSessionOrThrow(req.headers);

        res.locals.payload = { ...session?.user };

        next();
    }),
);

router.get(
    "/check-workspace-slug",
    asyncHandler(async (req, res, next) => {
        await getSessionOrThrow(req.headers);

        const { slug } = req.query;

        if (!slug) {
            throw new InvalidPayloadError({
                reason: "Parameter slug required",
            });
        }

        const receivedSlug = String(slug);

        const suggestedSlug = slugSchema.parse(receivedSlug);

        if (receivedSlug !== suggestedSlug) {
            res.locals.payload = {
                is_available: false,
                is_valid_format: false,
                suggestion: suggestedSlug,
            };

            return next();
        }

        const workspace = await prisma.workspace.findUnique({
            where: {
                slug: receivedSlug,
            },
            select: {
                slug: true,
            },
        });

        if (workspace) {
            res.locals.payload = {
                is_avaliable: false,
                is_valid_format: true,
            };
        } else {
            res.locals.payload = {
                is_avaliable: true,
                is_valid_format: true,
            };
        }

        next();
    }),
);

export default router;
