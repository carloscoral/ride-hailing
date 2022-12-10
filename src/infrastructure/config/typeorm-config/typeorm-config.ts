import { EnvironmentConfigService } from '../environment-config/environment-config.service';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist';
import * as path from 'path';
import { User } from 'src/infrastructure/entities/user.entity';
import { Role } from 'src/infrastructure/entities/role.entity';
import { Location } from 'src/infrastructure/entities/location.entity';
import { Ride } from 'src/infrastructure/entities/ride.entity';
import { Config } from 'src/domain/config/config';

export function getTypeOrmModuleOptions(config: Config): TypeOrmModuleOptions {
    return {
        type: 'postgres',
        host: config.getDatabaseHost(),
        port: config.getDatabasePort(),
        username: config.getDatabaseUser(),
        password: config.getDatabasePassword(),
        database: config.getDatabaseName(),
        entities: [
            Location,
            Role,
            User,
            Ride
        ],
        synchronize: config.getDatabaseSync(),
        schema: config.getDatabaseSchema(),
        migrationsRun: true,
        migrationsTableName: 'migration_ride_hailing',
        migrations: ['database/migrations/**/*{.ts,.js}']
    }
}
