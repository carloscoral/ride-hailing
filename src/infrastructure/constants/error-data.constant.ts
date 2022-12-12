import { ErrorCode } from "./error-code.constant";

interface ErrorData {
    message: string;
    httpStatusCode: number;
}

export const ErrorData: { [key in ErrorCode]: ErrorData } = {
    [ErrorCode.ENVIRONMENT_ERROR]: {
        message: 'Error configurando variables de entorno',
        httpStatusCode: 500
    },
    [ErrorCode.BAD_PARAMETERS]: {
        message: 'Bad parameters',
        httpStatusCode: 400
    },
    [ErrorCode.RESOURCE_NOT_FOUND]: {
        message: 'Resource not found',
        httpStatusCode: 404
    },
    [ErrorCode.PAYMENT_W_NOT_AUTHORIZED]: {
        message: 'Payment credentials not authorized',
        httpStatusCode: 401
    },
    [ErrorCode.PAYMENT_TOKEN_ERROR]: {
        message: 'Acceptance token or token already used',
        httpStatusCode: 422
    },
    [ErrorCode.INTERNAL_ERROR]: {
        message: 'Internal error',
        httpStatusCode: 500
    },
    [ErrorCode.CURRENT_RIDE]: {
        message: 'You have a ride in progress',
        httpStatusCode: 400
    },
    [ErrorCode.NO_PAYMENT_METHOD]: {
        message: 'Rider doesn\'t have payment method',
        httpStatusCode: 400
    }
}