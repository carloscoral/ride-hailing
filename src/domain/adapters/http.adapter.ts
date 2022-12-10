export type HttpHeaders = { [key: string]: string };

export abstract class HttpAdapter {
    abstract get<T>(url: string, headers: HttpHeaders): Promise<T>;
    abstract post<T>(url: string, body: any|null, headers: HttpHeaders): Promise<T>;
}