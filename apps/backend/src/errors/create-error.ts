import type { ErrorCode } from "./error-codes";

/**
 * ## Create custom error
 * ```
 * // this is how you want to use it
 * const InternalError = createError<Extensions>(name, code, message, status);
 * const error = new InternalError(extensions);
 * ```
 * @param code Custom code for Zora
 * @param message One-line message regarding the error
 * @param status HTTP status code
 * @returns An anonymous class extending from default `Error` class
 * @description the property `extensions` ise a generic type thre you can pass some optional details about the error
 */
export function createError<Extensions = void>(code: ErrorCode, message: string, status: number) {
    return class extends Error {
        override name = "ZoraError";
        code = code;
        status = status;
        extensions: Extensions;

        constructor(extensions: Extensions) {
            super(message);
            this.extensions = extensions;
        }

        override toString() {
            return `${this.name} [${this.code}]: ${this.message}`;
        }
    };
}
