import { BasicException } from "src/domain/exception/basic-exception.interface";
import { ValidationError } from 'class-validator';
import { ErrorCode } from "../../constants/error-code.constant";
import { ErrorData } from "../../constants/error-data.constant";

export class EnvironmentException extends Error implements BasicException {
    internalCode: ErrorCode;
    internalMessage: string;
    additionalData: ValidationError[];
    
    constructor(errors: ValidationError[]) {
        const errorData = ErrorData[ErrorCode.ENVIRONMENT_ERROR];
        super(errorData.message);
        this.internalCode = ErrorCode.ENVIRONMENT_ERROR;
        this.internalMessage = errorData.message;
        this.additionalData = errors;
    }
}