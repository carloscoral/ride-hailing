import { PaymentSourceModel } from "../model/payment-source.model";

export abstract class PaymentSourceRepository {
    abstract insertOne(paymentSource: Partial<PaymentSourceModel>): Promise<PaymentSourceModel>;
}