import { BasicException } from "src/domain/exception/basic-exception.interface";
import { ValidationError } from 'class-validator';
import { ErrorCode } from "../../constants/error-code.constant";
import { ErrorMessage } from "../../constants/error-message.constant";

export class EnvironmentException extends Error implements BasicException {
    internalCode: ErrorCode;
    internalMessage: string;
    additionalData: ValidationError[];
    
    constructor(errors: ValidationError[]) {
        const errorMessage = ErrorMessage[ErrorCode.ENVIRONMENT_ERROR];
        super(errorMessage);
        this.internalCode = ErrorCode.ENVIRONMENT_ERROR;
        this.internalMessage = errorMessage;
        this.additionalData = errors;
    }
}