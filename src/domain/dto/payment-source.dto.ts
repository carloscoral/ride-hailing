export interface PaymentSource {
    customer_email: string;
    type: 'NEQUI' | 'CARD';
    token: string;
    acceptance_token: string;
}