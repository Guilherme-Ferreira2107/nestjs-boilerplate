import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';
import { map, Observable } from 'rxjs';
import { NestResponse } from './nest-response';

@Injectable()
export class TransformResponseInterceptor implements NestInterceptor {
  private httpAdapter: AbstractHttpAdapter;

  constructor(adapterHost: HttpAdapterHost) {
    this.httpAdapter = adapterHost.httpAdapter;
  }

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((responseController: NestResponse) => {
        if (responseController instanceof NestResponse) {
          const subContext = context.switchToHttp();
          const response = subContext.getResponse();
          const { headers, body, status } = responseController;

          const headersName = Object.getOwnPropertyNames(headers);
          headersName.forEach((headerName) => {
            const headersValues = headers[headerName];
            this.httpAdapter.setHeader(response, headerName, headersValues);
          });

          this.httpAdapter.status(response, status);

          return body;
        }

        return responseController;
      }),
    );
  }
}
