import { Router } from "express";
import miscellaneousRouter from "./miscellaneous";

const router: Router = Router();

router.use("/miscellaneous", miscellaneousRouter);

export default router;
