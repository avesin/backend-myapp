import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';

@Catch()
@Injectable()
export class AllExceptionsFilter implements ExceptionFilter {
    constructor(private readonly configService: ConfigService) { }

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const isDev = this.configService.get('APP_ENV') === 'development';


        const code =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        const status = code < 400

        const error =
            exception instanceof HttpException
                ? exception.getResponse()
                : isDev ? (exception as any).stack : "Internal server error";


        let message: any;

        if (typeof error === 'string') {
            message = error;
        } else if (typeof error === 'object' && error !== null) {
            message = (error as any).message ?? JSON.stringify(error);
        } else {
            message = 'Internal error';
        }

        if (isDev) {
            console.log(`[${request.method}] ${request.url} → ${status}\n${JSON.stringify(message)}\n${(exception as any).stack}`,)
        }

        response.status(code).json({
            code,
            status,
            message,
            path: request.url,
            timestamp: new Date().toISOString(),
        });
    }
}