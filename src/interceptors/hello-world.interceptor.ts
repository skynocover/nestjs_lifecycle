import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

import { tap } from 'rxjs/operators';

@Injectable()
export class HelloWorldInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('This is interceptor');
    const input = Date.now();
    return next
      .handle()
      .pipe(tap(() => console.log(`${Date.now() - input} ms`)));
    // return next.handle();
  }
}
