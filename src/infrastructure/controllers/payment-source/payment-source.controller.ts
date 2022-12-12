import { Controller, Post, Body, Inject } from '@nestjs/common';
import { PaymentSourceDto } from 'src/domain/dto/payment-source.dto';
import { PaymentSourcePort } from 'src/domain/ports/payment-source.port';
import { UsecasesProxyModule } from 'src/infrastructure/usecases-proxy/usecases-proxy.module';
import { PaymentSourceRequestDto } from './payment-source-request.dto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Controller('payment-source')
export class PaymentSourceController {

    constructor(
        @Inject(UsecasesProxyModule.PAYMENT_METHOD_USECASES)
        private readonly paymentMethodUsecases: PaymentSourcePort
    ) { }

    @Post()
    async createPaymentSource(@Body() body: PaymentSourceRequestDto) {
        const data = plainToInstance(PaymentSourceRequestDto, body, { enableImplicitConversion: false });
        const errors = await validate(data, { skipMissingProperties: false, skipNullProperties: false, skipUndefinedProperties: false });
        if (errors.length > 0) {
            return errors;
        }
        return await this.paymentMethodUsecases.create(data.userId, data);
    }
}
