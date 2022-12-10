import { RideModel } from "./ride.model";
import { RoleModel } from "./role.model";

export interface UserModel {
    id: number;
    username: string;
    role: RoleModel;
}