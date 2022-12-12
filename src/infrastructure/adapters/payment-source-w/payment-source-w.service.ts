import { Injectable } from '@nestjs/common';
import { PaymentSourceDto } from 'src/domain/dto/payment-source.dto';
import { PaymentSourceAdapter } from 'src/domain/adapters/payment-source.adapter';
import { HttpAdapter } from 'src/domain/adapters/http.adapter';
import { Config } from 'src/domain/config/config';
import { PaymentDto } from 'src/domain/dto/payment.dto';

@Injectable()
export class PaymentSourceWService extends PaymentSourceAdapter {
    constructor(
        private httpService: HttpAdapter,
        private configService: Config
    ) {
        super();
    }

    async create(paymentSource: PaymentSourceDto): Promise<number> {
        const url = this.configService.getPaymentHost() + this.configService.getPaymentSourcePath();
        const headers = {
            Authorization: 'Bearer ' + this.configService.getPaymentPrivateKey(),
            'Content-Type': 'application/json'
        };
        const response = await this.httpService.post<{ data: { id: number } }>(url, paymentSource, headers);
        return response.data.id;
    }

    async pay(payment: PaymentDto): Promise<any> {
        const url = this.configService.getPaymentHost() + this.configService.getPaymentPath();
        const headers = {
            Authorization: 'Bearer ' + this.configService.getPaymentPrivateKey(),
            'Content-Type': 'application/json'
        };
        const response = await this.httpService.post<{ data: { id: number } }>(url, payment, headers);
        return response.data.id;
    }
}
