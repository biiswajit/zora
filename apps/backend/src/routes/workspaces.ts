import { prisma } from "@zora/prisma";
import { createWorkspaceSchema, workspaceSchema } from "@zora/utils";
import { Router } from "express";
import asyncHandler from "@/utils/async-handler";
import getSessionOrThrow from "@/utils/get-session";

const router: Router = Router();

router.get(
    "/",
    asyncHandler(async (req, res, next) => {
        const session = await getSessionOrThrow(req.headers);

        const result = await prisma.workspace.findMany({
            where: {
                users: {
                    some: {
                        userId: session.user.id,
                    },
                },
            },
            include: {
                users: {
                    select: {
                        role: true,
                        joinedOn: true,
                        user: {
                            select: {
                                image: true,
                                name: true,
                                email: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        const workspaces = result.map((workspace) => {
            const users = workspace.users.map((user) => ({
                ...user.user,
                role: user.role,
                joinedOn: user.joinedOn,
            }));

            return workspaceSchema.parse({
                id: workspace.id,
                name: workspace.name,
                slug: workspace.slug,
                color: workspace.color,
                createdAt: workspace.createdAt,
                updatedAt: workspace.updatedAt,
                users,
            });
        });

        res.locals.payload = workspaces;

        next();
    }),
);

router.post(
    "/",
    asyncHandler(async (req, res, next) => {
        const session = await getSessionOrThrow(req.headers);

        const { name, slug, color } = createWorkspaceSchema.parse(req.body);

        const workspace = await prisma.workspace.create({
            data: {
                name: name,
                slug: slug,
                color: color,
                users: {
                    create: {
                        userId: session.user.id,
                        role: "owner",
                    },
                },
            },
            include: {
                users: {
                    where: {
                        userId: session.user.id,
                    },
                    select: {
                        role: true,
                        joinedOn: true,
                        user: {
                            select: {
                                name: true,
                                email: true,
                                image: true,
                            },
                        },
                    },
                },
            },
        });

        const users = workspace.users.map((user) => ({
            ...user.user,
            role: user.role,
            joinedOn: user.joinedOn,
        }));

        res.locals.payload = workspaceSchema.parse({
            id: workspace.id,
            name: workspace.name,
            slug: workspace.slug,
            color: workspace.color,
            createdAt: workspace.createdAt,
            updatedAt: workspace.updatedAt,
            users,
        });

        next();
    }),
);

export default router;
