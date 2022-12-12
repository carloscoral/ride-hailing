import { Module } from '@nestjs/common';
import { PaymentSourceWService } from './payment-source-w/payment-source-w.service';
import { HttpService } from './http/http.service';
import { EnvironmentConfigModule } from '../config/environment-config/environment-config.module';
import { PaymentSourceAdapter } from 'src/domain/adapters/payment-source.adapter';
import { HttpAdapter } from 'src/domain/adapters/http.adapter';
import { DateService } from './date/date.service';
import { DateAdapter } from 'src/domain/adapters/date.adapter';
import { GeoService } from './geo/geo.service';
import { GeoAdapter } from 'src/domain/adapters/geo.adapter';

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
        },
        {
            provide: DateAdapter,
            useClass: DateService
        },
        {
            provide: GeoAdapter,
            useClass: GeoService
        }
    ],
    exports: [PaymentSourceAdapter, HttpAdapter, DateAdapter, GeoAdapter]
})
export class AdaptersModule {}
