export interface PaymentDto {
    amount_in_cents: number,
    currency: 'COP'
    customer_email: string
    payment_method: {
      installments: number
    },
    reference: string;
    payment_source_id: number;
}