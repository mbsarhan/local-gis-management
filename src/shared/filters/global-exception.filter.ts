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

        if (exception instanceof HttpException) {
            const status = exception.getStatus();
            const payload: any = exception.getResponse();
            const message = typeof payload === 'string'
                ? payload
                : Array.isArray(payload?.message)
                    ? payload.message.join(', ')
                    : payload?.message ?? exception.message;

            return response
                .status(status)
                .json({ error: message });
        }

        if (exception?.code) {
            if (exception.code === 'P2003') {
                const fieldName = String(exception?.meta?.field_name ?? '');
                let message = 'قيمة مرجعية غير موجودة (Foreign Key)';

                if (fieldName.includes('id_type_regulatory_area')) message = 'id_type_regulatory_area غير صالح';
                else if (fieldName.includes('id_community')) message = 'id_community غير صالح';
                else if (fieldName.includes('id_who')) message = 'id_who غير صالح';

                return response.status(HttpStatus.BAD_REQUEST).json({ error: message });
            }

            if (exception.code === 'P2002') {
                return response.status(HttpStatus.CONFLICT).json({ error: 'قيمة مكررة (Unique constraint)' });
            }

            if (exception.code === 'P2025') {
                return response.status(HttpStatus.NOT_FOUND).json({ error: 'السجل المطلوب غير موجود' });
            }

            if (exception.code === '23505') {
                return response.status(HttpStatus.CONFLICT).json({ error: 'Record already exists' });
            }

            if (exception.code === '23503') {
                return response.status(HttpStatus.BAD_REQUEST).json({ error: 'Referenced record does not exist' });
            }

            if (exception.code === 'P0001') {
                return response.status(HttpStatus.BAD_REQUEST).json({ error: exception.message });
            }
        }

        const shouldLogDetails = process.env.NODE_ENV === 'development' || process.env.APP_ENV === 'development';
        if (shouldLogDetails) {
            console.error(exception);
        } else {
            const code = exception?.code ?? 'ERR';
            const message = exception?.message ?? String(exception);
            console.error(`[${code}] ${message}`);
        }
        return response
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({ error: 'Internal server error' });
    }
}
