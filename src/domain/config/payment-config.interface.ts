export interface PaymentConfig {
    getPaymentHost(): string;
    getPaymentSourcePath(): string;
    getPaymentPrivateKey(): string;
}