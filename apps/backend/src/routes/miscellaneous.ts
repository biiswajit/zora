import { Router } from "express";

const router: Router = Router();

router.get("/health", (_, res) => {
    return res.status(200).json({
        status: "Server is up.",
    });
});

export default router;
