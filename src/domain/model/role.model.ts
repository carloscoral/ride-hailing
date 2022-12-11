import { UserModel } from "./user.model";

export interface RoleModel {
    id?: number;
    code: string;
    name: string;
    description: string;
    users: UserModel[];
}