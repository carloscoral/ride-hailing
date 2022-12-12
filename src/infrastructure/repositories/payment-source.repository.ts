import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentSourceModel } from 'src/domain/model/payment-source.model';
import { PaymentSourceRepository } from 'src/domain/repositories/payment-source.repository';
import { Repository } from 'typeorm';
import { PaymentSource } from '../entities/payment-source.entity';

@Injectable()
export class PaymentSourceRepositoryImp extends PaymentSourceRepository {

    constructor(
        @InjectRepository(PaymentSource)
        private readonly paymentSourceRepository: Repository<PaymentSource>
    ) {
        super();
    }

    async insertOne(paymentSource: Partial<PaymentSourceModel>): Promise<PaymentSourceModel> {
        const result = await this.paymentSourceRepository.insert(paymentSource);
        return result.raw[0];
    }
}