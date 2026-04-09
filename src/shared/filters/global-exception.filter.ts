import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx      = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        // NestJS HTTP exceptions (UnauthorizedException, BadRequestException, etc.)
        if (exception instanceof HttpException) {
            return response
                .status(exception.getStatus())
                .json({ error: exception.message });
        }

        // PostgreSQL errors
        if (exception.code) {
            // Unique constraint violation
            if (exception.code === '23505') {
                return response.status(HttpStatus.CONFLICT).json({ error: 'Record already exists' });
            }
            // Foreign key violation
            if (exception.code === '23503') {
                return response.status(HttpStatus.BAD_REQUEST).json({ error: 'Referenced record does not exist' });
            }
            // PL/pgSQL RAISE EXCEPTION
            if (exception.code === 'P0001') {
                return response.status(HttpStatus.BAD_REQUEST).json({ error: exception.message });
            }
        }

        console.error(exception);
        return response
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({ error: 'Internal server error' });
    }
}