export interface UnexpectedError {
    kind: "UnexpectedError";
    error: unknown;
}

export type DataError = UnexpectedError;