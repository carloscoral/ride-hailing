import { PaymentSourceModel } from "./payment-source.model";
import { RoleModel } from "./role.model";

export interface UserModel {
    id: number;
    email: string;
    payment_sources: PaymentSourceModel[];
    role: RoleModel;
}