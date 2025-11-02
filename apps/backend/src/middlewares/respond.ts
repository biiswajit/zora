import type { RequestHandler } from "express";
import type { StandardResponse } from "@/types";
import { asyncHandler } from "@/utils";

export const respond: RequestHandler = asyncHandler(async (_, res) => {
    if (!res.locals.payload) {
        return res.status(204).end();
    }

    if (Buffer.isBuffer(res.locals.payload)) {
        return res.send(res.locals.payload);
    }

    return res.json({
        status: "success",
        message: res.locals.message ?? undefined,
        data: res.locals.payload,
        meta: res.locals.meta ?? undefined,
    } as StandardResponse);
});
