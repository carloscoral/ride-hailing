import { Module } from '@nestjs/common';
import { PaymentSourceWService } from './payment-source-w/payment-source-w.service';
import { HttpService } from './http/http.service';
import { EnvironmentConfigModule } from '../config/environment-config/environment-config.module';
import { PaymentSourceAdapter } from 'src/domain/adapters/payment-source.adapter';
import { HttpAdapter } from 'src/domain/adapters/http.adapter';

@Module({
    imports: [EnvironmentConfigModule],
    providers: [
        {
            provide: PaymentSourceAdapter,
            useClass: PaymentSourceWService
        },
        {
            provide: HttpAdapter,
            useClass: HttpService
        }
    ],
    exports: [PaymentSourceAdapter, HttpAdapter]
})
export class AdaptersModule {}
