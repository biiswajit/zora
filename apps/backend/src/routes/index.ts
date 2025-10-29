import { Router } from "express";
import miscellaneousRouter from "./miscellaneous";
import workspaceRouter from "./workspaces";

const router: Router = Router();

router.use("/misc", miscellaneousRouter);
router.use("/workspaces", workspaceRouter);

export default router;
