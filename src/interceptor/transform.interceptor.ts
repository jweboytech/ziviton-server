import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HTTP_CODE } from 'src/constants';

export interface Response<T> {
  data: T;
  msg: string;
  code: number;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        if (data != null && !data.data) {
          return { data, code: HTTP_CODE.OK, msg: '请求成功' };
        }
        return data;
      }),
    );
  }
}

// @Injectable()
// export class ErrorInterceptor<T> implements NestInterceptor<T, Response<T>> {
//   intercept(
//     context: ExecutionContext,
//     next: CallHandler,
//   ): Observable<Response<null>> {
//     return next.handle().pipe(
//       catchError((err) => {
//         return throwError({
//           data: null,
//           code: HttpStatus.INTERNAL_SERVER_ERROR,
//           msg: err.message || '服务器错误',
//         });
//       }),
//     );
//   }
// }
