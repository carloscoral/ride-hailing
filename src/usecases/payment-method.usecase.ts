import { PaymentSourceAdapter } from "src/domain/adapters/payment-source.adapter";
import { PaymentSourceDto } from "src/domain/dto/payment-source.dto";
import { PaymentSourceModel } from "src/domain/model/payment-source.model";
import { PaymentSourcePort } from "src/domain/ports/payment-source.port";
import { PaymentSourceRepository } from "src/domain/repositories/payment-source.repository";
import { UserRepository } from "src/domain/repositories/user.repository";
import { ErrorCode } from "src/infrastructure/constants/error-code.constant";
import { BasicHttpException } from "src/infrastructure/controllers/exceptions/basic-http.exception";
import { AxiosError } from 'axios';

export class PaymentMethodUseCase implements PaymentSourcePort {

    constructor(
        private paymentSource: PaymentSourceAdapter,
        private userRepository: UserRepository,
        private paymentSourceRepository: PaymentSourceRepository
    ) {}

    async create(userId: number, paymentSource: PaymentSourceDto): Promise<PaymentSourceModel> {
        const user = await this.userRepository.getById(userId);
        if (!user) {
            throw new BasicHttpException(ErrorCode.RESOURCE_NOT_FOUND, { field: 'userId', value: userId });
        }
        try {
            const paymentId = await this.paymentSource.create({
                ...paymentSource,
                customer_email: user.email
            });
            const paymentMethod = await this.paymentSourceRepository.insertOne({
                payment_source_id: paymentId,
                user
            });
            user.payment_sources.push(paymentMethod);
            this.userRepository.updateUser(user);
            return paymentMethod;
        } catch (e) {
            if (e instanceof AxiosError) {
                switch(e.response?.status) {
                    case 401:
                        throw new BasicHttpException(ErrorCode.PAYMENT_W_NOT_AUTHORIZED);
                    case 422:
                        throw new BasicHttpException(ErrorCode.PAYMENT_TOKEN_ERROR);
                    default:
                        throw new BasicHttpException(ErrorCode.INTERNAL_ERROR, e.response.data.error);
                }
            }
            throw new BasicHttpException(ErrorCode.INTERNAL_ERROR, e);
        }
    }
}