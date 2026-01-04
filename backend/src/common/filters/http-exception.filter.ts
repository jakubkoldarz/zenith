import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let errors: string[] = ['Internal server error'];

        if (exception instanceof HttpException) {
            status = exception.getStatus();
            const exceptionResponse = exception.getResponse();

            if (typeof exceptionResponse === 'string') {
                errors = [exceptionResponse];
            } else if (
                typeof exceptionResponse === 'object' &&
                exceptionResponse !== null
            ) {
                const responseObj = exceptionResponse as any;

                // Handle class-validator errors
                if (Array.isArray(responseObj.message)) {
                    errors = responseObj.message;
                } else if (responseObj.message) {
                    errors = [responseObj.message];
                } else if (responseObj.error) {
                    errors = [responseObj.error];
                } else {
                    errors = ['An error occurred'];
                }
            }
        } else if (exception instanceof Error) {
            errors = [exception.message];
        }

        response.status(status).json({
            status,
            errors,
        });
    }
}
