import { ErrorCode } from "./error-code.constant";

export const ErrorMessage: { [key in ErrorCode]: string } = {
    [ErrorCode.ENVIRONMENT_ERROR]: 'Error configurando variables de entorno'
}