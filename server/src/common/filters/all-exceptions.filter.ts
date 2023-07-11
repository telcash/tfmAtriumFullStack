import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { HttpAdapterHost } from '@nestjs/core';
  
  /**
   * Filtro que captura todas la exceptions sin manejar
   */
  @Catch()
  export class AllExceptionsFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
  
    catch(exception: unknown, host: ArgumentsHost): void {
      // In certain situations `httpAdapter` might not be available in the
      // constructor method, thus we should resolve it here.
      const { httpAdapter } = this.httpAdapterHost;
  
      const ctx = host.switchToHttp();
      
      const httpStatus =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;

      const message = 
        exception instanceof HttpException
          ? exception.message
          : "Internal Server Error";

      const response =
        exception instanceof HttpException
          ? exception.getResponse()
          : exception;

      const responseBody = {
        statusCode: httpStatus,
        message: message,
        response: response,
        timestamp: new Date().toISOString(),
        path: httpAdapter.getRequestUrl(ctx.getRequest()),
        method: httpAdapter.getRequestMethod(ctx.getRequest()),
      };
  
      httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
  }