import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response as HttpResponse } from 'express-serve-static-core';

export interface Response<T> {
  data: T;
}

@Injectable()
export class FormattedResponse<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const res: HttpResponse = context.switchToHttp().getResponse();
    const success = res.statusCode >= 200 && res.statusCode < 300;
    
    return next
      .handle()
      .pipe(map((data) => ({ success: success, data, error: null })));
  }
}
