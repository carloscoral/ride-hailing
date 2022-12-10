import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormConfigModule } from '../config/typeorm-config/typeorm-config.module';
import { Location } from '../entities/location.entity';
import { Ride } from '../entities/ride.entity';
import { Role } from '../entities/role.entity';
import { User } from '../entities/user.entity';

@Module({
    imports: [TypeormConfigModule, TypeOrmModule.forFeature([Location, Role, User, Ride])]
})
export class RepositoriesModule {}
