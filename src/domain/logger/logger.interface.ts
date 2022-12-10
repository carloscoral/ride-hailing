export abstract class Logger {
    abstract log(context: string, message: string): void;
    abstract error(context: string, message: string): void;
}