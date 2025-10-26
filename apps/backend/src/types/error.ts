export interface StandardError {
    message: string;
    extensions: {
        code: string;
        [key: string]: unknown;
    };
}
