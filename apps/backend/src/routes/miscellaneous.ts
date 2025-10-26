import { Router } from "express";
import asyncHandler from "@/utils/async-handler";

const router: Router = Router();

router.get(
    "/health",
    asyncHandler((_, res, next) => {
        res.locals.payload = "Server is ready to serve";
        res.locals.meta = {
            version: "0.0.0",
        };

        next();
    }),
);

export default router;
