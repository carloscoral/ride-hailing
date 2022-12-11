import { RideModel } from "./ride.model";
import { RoleModel } from "./role.model";

export interface UserModel {
    id?: number;
    email: string;
    payment_source_id?: number;
    role: RoleModel;
}