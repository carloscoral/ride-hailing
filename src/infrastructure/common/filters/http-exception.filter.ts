import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { BasicHttpException } from 'src/infrastructure/controllers/exceptions/basic-http.exception';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {

    catch(exception: any, host: ArgumentsHost) {
        console.log(exception);
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        if (exception instanceof BasicHttpException) {
            return response.status(exception.code).json({
                code: exception.internalCode,
                message: exception.internalMessage,
                data: exception.additionalData
            });
        }

        return response.status(500).json(exception);
    }
}
