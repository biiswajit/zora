export interface StandardError {
    message: string;
    code: string;
    status: number;
    extensions?: {
        [key: string]: unknown;
    };
}
