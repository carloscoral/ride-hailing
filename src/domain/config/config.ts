import { DatabaseConfig } from "./database-config.interface";
import { PaymentConfig } from "./payment-config.interface";

export abstract class Config implements DatabaseConfig, PaymentConfig {
    abstract getDatabaseHost(): string;
    abstract getDatabasePort(): number;
    abstract getDatabaseUser(): string;
    abstract getDatabasePassword(): string;
    abstract getDatabaseName(): string;
    abstract getDatabaseSchema(): string;
    abstract getDatabaseSync(): boolean;
    abstract getPaymentHost(): string;
    abstract getPaymentSourcePath(): string;
    abstract getPaymentPrivateKey(): string;
}