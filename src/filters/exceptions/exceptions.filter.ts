import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
  BadRequestException,
  GatewayTimeoutException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { HTTP_CODE } from 'src/constants';

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(ExceptionsFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.OK;

    const message = exception.message;

    // if (exception instanceof BadRequestException) {
    //   message = '请求参数不全';
    // }

    // if (exception instanceof GatewayTimeoutException) {
    //   message = '服务器错误';
    // }

    // if (exception instanceof Error) {
    //   message = exception.message;
    // }

    this.logger.error(`Request {${request.url}, ${status}} ${message}`);

    response.status(HttpStatus.OK).json({
      code: HTTP_CODE.ERROR,
      msg: message,
      data: null,
    });
  }
}
