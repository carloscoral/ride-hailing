import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Config } from 'src/domain/config/config';
import { EnvironmentConfigService } from './environment-config.service';
import { validate } from './environment-validator';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
            isGlobal: true,
            validate
        })
    ],
    providers: [
        {
            provide: Config,
            useClass: EnvironmentConfigService
        }
    ],
    exports: [Config]
})
export class EnvironmentConfigModule {}
