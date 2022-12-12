import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationRepository } from 'src/domain/repositories/location.repository';
import { PaymentSourceRepository } from 'src/domain/repositories/payment-source.repository';
import { RideRepository } from 'src/domain/repositories/ride.repository';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { TypeormConfigModule } from '../config/typeorm-config/typeorm-config.module';
import { Location } from '../entities/location.entity';
import { PaymentSource } from '../entities/payment-source.entity';
import { Ride } from '../entities/ride.entity';
import { Role } from '../entities/role.entity';
import { User } from '../entities/user.entity';
import { LocationRepositoryImp } from './location.repository';
import { PaymentSourceRepositoryImp } from './payment-source.repository';
import { RideRepositoryImp } from './ride.repository';
import { UserRepositoryImp } from './user.repository';

const providers = [
    {
        provide: UserRepository,
        useClass: UserRepositoryImp
    },
    {
        provide: PaymentSourceRepository,
        useClass: PaymentSourceRepositoryImp
    },
    {
        provide: RideRepository,
        useClass: RideRepositoryImp
    },
    {
        provide: LocationRepository,
        useClass: LocationRepositoryImp
    }
];

@Module({
    imports: [
        TypeormConfigModule,
        TypeOrmModule.forFeature([Location, Role, User, Ride, PaymentSource])
    ],
    providers,
    exports: [
        ...providers
    ]
})
export class RepositoriesModule {}
