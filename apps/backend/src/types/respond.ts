import type { StandardError } from "./error";

export interface StandardResponse<D = unknown, M = unknown> {
    status: "success" | "error";
    error?: StandardError;
    meta?: M;
    data?: D;
}
