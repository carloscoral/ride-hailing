import { plainToInstance } from "class-transformer";
import { IsString } from "class-validator";
import { IsBoolean, IsNumber, validateSync } from "class-validator";
import { EnvironmentException } from "./environment.exception";

class EnvironmentVariables {
    @IsString()
    DATABASE_HOST: string;

    @IsNumber()
    DATABASE_PORT: number;

    @IsString()
    DATABASE_USER: string;

    @IsString()
    DATABASE_PASSWORD: string;

    @IsString()
    DATABASE_NAME: string;

    @IsString()
    DATABASE_SCHEMA: string;

    @IsBoolean()
    DATABASE_SYNCHRONIZE: boolean;

    @IsString()
    PAYMENT_HOST: string;

    @IsString()
    PAYMENT_SOURCE_PATH: string;

    @IsString()
    PAYMENT_PRIVATE_KEY: string;

    @IsString()
    PAYMENT_PATH: string;
}

export function validate(config: Record<string, unknown>) {
    const validateConfig = plainToInstance(EnvironmentVariables, config, {
        enableImplicitConversion: true
    });
    const errors = validateSync(validateConfig, { skipMissingProperties: false });
    if (errors.length > 0) {
        throw new EnvironmentException(errors);
    }
    return validateConfig;
}