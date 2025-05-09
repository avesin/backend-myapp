import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const code =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        const status = code < 400

        const error =
            exception instanceof HttpException
                ? exception.getResponse()
                : (exception as any).stack;


        let message: any;

        if (typeof error === 'string') {
            message = error;
        } else if (typeof error === 'object' && error !== null) {
            message = (error as any).message ?? JSON.stringify(error);
        } else {
            message = 'Internal error';
        }

        // console.log(`[${request.method}] ${request.url} → ${status}\n${JSON.stringify(message)}\n${(exception as any).stack}`,)

        response.status(code).json({
            code,
            status,
            message,
            path: request.url,
            timestamp: new Date().toISOString(),
        });
    }
}