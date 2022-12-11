import { Injectable } from '@nestjs/common';
import { PaymentSource } from 'src/domain/dto/payment-source.dto';
import { PaymentSourceAdapter } from 'src/domain/adapters/payment-source.adapter';
import { HttpAdapter } from 'src/domain/adapters/http.adapter';
import { Config } from 'src/domain/config/config';

@Injectable()
export class PaymentSourceWService extends PaymentSourceAdapter {
    constructor(
        private httpService: HttpAdapter,
        private configService: Config
    ) {
        super();
    }

    async create(paymentSource: PaymentSource): Promise<number> {
        const url = this.configService.getPaymentHost() + this.configService.getPaymentSourcePath();
        const headers = {
            Authorization: 'Bearer ' + this.configService.getPaymentPrivateKey(),
            'Content-Type': 'application/json'
        };
        const response = await this.httpService.post<{ id: number }>(url, paymentSource, headers);
        return response.id;
    }
}
