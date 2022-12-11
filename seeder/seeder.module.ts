import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from 'src/infrastructure/entities/location.entity';
import { Ride } from 'src/infrastructure/entities/ride.entity';
import { Role } from 'src/infrastructure/entities/role.entity';
import { User } from 'src/infrastructure/entities/user.entity';
import { EnvironmentConfigModule } from '../src/infrastructure/config/environment-config/environment-config.module';
import { RepositoriesModule } from '../src/infrastructure/repositories/repositories.module';
import { SeederService } from './seeder.service';
import { RoleSeederService } from './seeders/role.seeder';
import { UserSeederService } from './seeders/user.seeder';

@Module({
  imports: [EnvironmentConfigModule, RepositoriesModule, TypeOrmModule.forFeature([Location, Role, User, Ride])],
  providers: [SeederService, RoleSeederService, UserSeederService]
})
export class SeederModule {}
