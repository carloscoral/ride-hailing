import { PaymentSourceDto } from "../dto/payment-source.dto";

export abstract class PaymentSourceAdapter {
    abstract create(paymentSource: PaymentSourceDto): Promise<number>;
}