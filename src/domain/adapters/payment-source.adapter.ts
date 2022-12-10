import { PaymentSource } from "../dto/payment-source.dto";

export abstract class PaymentSourceAdapter {
    abstract create(paymentSource: PaymentSource): Promise<number>;
}