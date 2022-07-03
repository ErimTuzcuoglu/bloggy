import { ApiResponse } from '@domain/common';
import { Decorator } from '@domain/enum';
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse<T>> {
    if (context.getHandler()[Decorator.disableResponseWrapper] === true) return next.handle();

    return next.handle().pipe(
      map((data) => {
        return new ApiResponse(data);
      })
    );
  }
}
