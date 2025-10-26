import { Router } from "express";
import miscellaneousRouter from "./miscellaneous";

const router: Router = Router();

router.use("/misc", miscellaneousRouter);

export default router;
