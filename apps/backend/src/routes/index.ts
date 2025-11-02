import { Router } from "express";
import { document } from "@/openapi";
import miscellaneousRouter from "./miscellaneous";
import workspaceRouter from "./workspaces";

const router: Router = Router();

router.use("/misc", miscellaneousRouter);

router.use("/workspaces", workspaceRouter);

router.get("/reference", (_req, res) => {
    return res.status(200).json(document);
});

export default router;
