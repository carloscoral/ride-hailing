import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Config } from 'src/domain/config/config';
import { EnvironmentConfigModule } from '../environment-config/environment-config.module';
import { getTypeOrmModuleOptions } from './typeorm-config';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [EnvironmentConfigModule],
            inject: [Config],
            useFactory: getTypeOrmModuleOptions
        })
    ]
})
export class TypeormConfigModule {}
