import { BasicException } from "src/domain/exception/basic-exception.interface";
import { ValidationError } from 'class-validator';
import { ErrorCode } from "../../constants/error-code.constant";
import { ErrorData } from "../../constants/error-data.constant";
import { HttpException } from "src/domain/exception/http-exception.interface";

export class BasicHttpException extends Error implements HttpException {
    internalCode: ErrorCode;
    internalMessage: string;
    additionalData: any;
    code: number;
    
    constructor(internalCode: ErrorCode, additionalData?: any) {
        const errorData = ErrorData[internalCode];
        super(errorData.message);
        this.internalCode = internalCode;
        this.internalMessage = errorData.message;
        this.additionalData = additionalData;
        this.code = errorData.httpStatusCode;
    }
}