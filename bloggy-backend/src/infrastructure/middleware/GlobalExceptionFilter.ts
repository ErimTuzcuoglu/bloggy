import ApiResponse from '@domain/common/ApiResponse';
import { AuthorizeException } from '@domain/exceptions';
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: Error, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    let httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception instanceof HttpException) httpStatus = exception.getStatus();
    if (exception instanceof AuthorizeException) httpStatus = HttpStatus.UNAUTHORIZED;

    const responseBody: ApiResponse<Record<string, unknown>> = {
      data: null,
      errors: [exception.message],
      message: 'Error',
      succeeded: false
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
