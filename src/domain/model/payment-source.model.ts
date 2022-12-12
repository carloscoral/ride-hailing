import { UserModel } from "./user.model";

export interface PaymentSourceModel {
    id: number;
    payment_source_id: number;
    user: UserModel;
}