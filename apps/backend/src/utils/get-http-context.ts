import type { Request } from "express";

export function getHttpContext(req: Request) {
    return {
        method: req.method,
        path: req.originalUrl,
        user_agent: req.headers["user-agent"],
        remote_ip: req.ip ?? "forwarded",
    };
}
