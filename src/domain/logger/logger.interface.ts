export interface Logger {
    log(context: string, message: string): void;
    error(context: string, message: string): void;
}