import { Module, DynamicModule } from '@nestjs/common';
import { DateAdapter } from 'src/domain/adapters/date.adapter';
import { GeoAdapter } from 'src/domain/adapters/geo.adapter';
import { PaymentSourceAdapter } from 'src/domain/adapters/payment-source.adapter';
import { LocationRepository } from 'src/domain/repositories/location.repository';
import { PaymentSourceRepository } from 'src/domain/repositories/payment-source.repository';
import { RideRepository } from 'src/domain/repositories/ride.repository';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { PaymentMethodUseCase } from 'src/usecases/payment-method.usecase';
import { RideUsecase } from 'src/usecases/ride.usecase';
import { AdaptersModule } from '../adapters/adapters.module';
import { PaymentSource } from '../entities/payment-source.entity';
import { RepositoriesModule } from '../repositories/repositories.module';

@Module({
    imports: [ RepositoriesModule, AdaptersModule ]
})
export class UsecasesProxyModule {
    static PAYMENT_METHOD_USECASES = 'PaymentMethodUsecase';
    static RIDE_USECASES = 'RideUsecase';

    static register(): DynamicModule {
        const providers = [
            {
                provide: UsecasesProxyModule.PAYMENT_METHOD_USECASES,
                inject: [PaymentSourceAdapter, UserRepository, PaymentSourceRepository],
                useFactory: (
                    paymentSource: PaymentSourceAdapter,
                    userRepository: UserRepository,
                    paymentSourceRepository: PaymentSourceRepository
                ) => new PaymentMethodUseCase(paymentSource, userRepository, paymentSourceRepository)
            },
            {
                provide: UsecasesProxyModule.RIDE_USECASES,
                inject: [RideRepository, LocationRepository, UserRepository, DateAdapter, GeoAdapter],
                useFactory: (
                    rideRepository: RideRepository,
                    locationRepository: LocationRepository,
                    userRepository: UserRepository,
                    dateAdapter: DateAdapter,
                    geoAdapter: GeoAdapter
                ) => new RideUsecase(rideRepository, locationRepository, userRepository, dateAdapter, geoAdapter)
            }
        ];

        return {
            module: UsecasesProxyModule,
            providers,
            exports: [
                ...providers
            ]
        }
    }
}
