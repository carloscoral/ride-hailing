import { Module } from '@nestjs/common';
import { UsecasesProxyModule } from '../usecases-proxy/usecases-proxy.module';
import { PaymentSourceController } from './payment-source/payment-source.controller';
import { RideController } from './ride/ride.controller';

@Module({
    imports: [
        UsecasesProxyModule.register()
    ],
    controllers: [
        PaymentSourceController,
        RideController
    ]
})
export class ControllersModule {}
