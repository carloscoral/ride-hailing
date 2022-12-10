import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Config } from 'src/domain/config/config';

@Injectable()
export class EnvironmentConfigService extends Config {

    constructor(private configService: ConfigService) {
        super();
    }

    getDatabaseHost(): string {
        return this.configService.get<string>('DATABASE_HOST');
    }

    getDatabasePort(): number {
        return this.configService.get<number>('DATABASE_PORT');
    }

    getDatabaseUser(): string {
        return this.configService.get<string>('DATABASE_USER');
    }

    getDatabasePassword(): string {
        return this.configService.get<string>('DATABASE_PASSWORD');
    }

    getDatabaseName(): string {
        return this.configService.get<string>('DATABASE_NAME');
    }

    getDatabaseSchema(): string {
        return this.configService.get<string>('DATABASE_SCHEMA');
    }

    getDatabaseSync(): boolean {
        return this.configService.get<boolean>('DATABASE_SYNCHRONIZE');
    }

    getPaymentHost(): string {
        return this.configService.get<string>('PAYMENT_HOST');
    }

    getPaymentSourcePath(): string {
        return this.configService.get<string>('PAYMENT_SOURCE_PATH');
    }

    getPaymentPrivateKey(): string {
        return this.configService.get<string>('PAYMENT_PRIVATE_KEY');
    }
}
