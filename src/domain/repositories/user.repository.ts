import { UserModel } from "../model/user.model";

export abstract class UserRepository {
    abstract getById(userId: number): Promise<UserModel>;
    abstract updateUser(user: UserModel): Promise<UserModel>;
    abstract getDriver(): Promise<UserModel>;
}