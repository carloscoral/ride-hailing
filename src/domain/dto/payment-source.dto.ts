export interface PaymentSourceDto {
    customer_email: string;
    type: 'NEQUI' | 'CARD';
    token: string;
    acceptance_token: string;
}