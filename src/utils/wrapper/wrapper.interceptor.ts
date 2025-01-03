import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Response } from 'express';
import { STATUS_CODES } from 'http';
import { Observable, map } from 'rxjs';

@Injectable()
export class WrapperInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const ctx = context.switchToHttp();
        const response = ctx.getResponse<Response>();
        return {
          statusCode: response.statusCode,
          message: STATUS_CODES[response.statusCode],
          data,
        };
      }),
    );
  }
}
