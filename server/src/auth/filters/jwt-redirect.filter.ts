import { ArgumentsHost, Catch, ExceptionFilter, UnauthorizedException } from '@nestjs/common';

@Catch(UnauthorizedException)
export class JwtRedirectFilter<T> implements ExceptionFilter {

  url: string;
  statusCode: number = 301;

  constructor(url: string) {
    this.url = url;
  }

  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    response.json({
      url: this.url,
      statusCode: this.statusCode,
    })
  }
}
