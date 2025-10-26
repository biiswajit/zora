import type { StandardError } from "./error";

export interface StandardResponse<D = unknown, M = unknown> {
    status: "success" | "error";
    errors?: StandardError[];
    message?: string;
    meta?: M;
    data?: D;
}
