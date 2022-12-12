import { PaymentSourceDto } from "../dto/payment-source.dto";
import { PaymentDto } from "../dto/payment.dto";

export abstract class PaymentSourceAdapter {
    abstract create(paymentSource: PaymentSourceDto): Promise<number>;
    abstract pay(payment: PaymentDto): Promise<any>;
}