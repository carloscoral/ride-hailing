export interface Seeder<T, U> {
    seed(data: T): Promise<U>;
}