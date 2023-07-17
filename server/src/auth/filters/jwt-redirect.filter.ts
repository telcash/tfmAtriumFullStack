import { ArgumentsHost, Catch, ExceptionFilter, UnauthorizedException } from '@nestjs/common';


@Catch(UnauthorizedException)
export class JwtRedirectFilter<T> implements ExceptionFilter {

  url: string;
  statusCode: number = 301;

  constructor(url: string) {
    this.url = url;
  }

  catch(exception: UnauthorizedException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const isTokenInRequest = ctx.getRequest().headers.authorization ? true : false;
    if (!isTokenInRequest) {
      return response.redirect(this.url);
    }
    return response.send(new UnauthorizedException);
  }
}