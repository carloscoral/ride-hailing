import { PaymentSourceDto } from "../dto/payment-source.dto";
import { PaymentSourceModel } from "../model/payment-source.model";

export abstract class PaymentSourcePort {
    abstract create(userId: number, paymentSource: Partial<PaymentSourceDto>): Promise<PaymentSourceModel>;
}