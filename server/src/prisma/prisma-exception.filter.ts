import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import { Prisma } from "@prisma/client";



@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {

    constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

    catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
        // Instancias para acceder al request y response
        const { httpAdapter } = this.httpAdapterHost;
        const ctx = host.switchToHttp();
        const req = ctx.getRequest()

        // Determinamos en que modelo de prisma se generó el error
        const entity = this.getErrorEntity(req);

        // Constante para mapeo de la respuesta del error
        const responses= {
            P2000: {
                statusCode: HttpStatus.BAD_REQUEST,
                message: 'Invalid provided value'
            },
            P2002: {
                statusCode: HttpStatus.BAD_REQUEST,
                message: `${entity} already exists`,
            },
            P2003: {
                statusCode: HttpStatus.BAD_REQUEST,
                message:`${entity} already exists`,
            },
            P2025: {
                statusCode: HttpStatus.NOT_FOUND,
                message: `${entity} doesn't exists`,
            },
        }

        // Respuesta por default:
        const responseBodyDefault = {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Internal Server Error',
        }

        // Determina el cuerpo de la respuesta
        const prismaCode = exception.code;
        const responseBody = responses[prismaCode] ? responses[prismaCode] : responseBodyDefault;
        const statusCode = responseBody.statusCode;

        // Respuesta para el cliente
        httpAdapter.reply(ctx.getResponse(), responseBody, statusCode);
    }

    /**
     * Busca el modelo de prisma que generó un error
     * @param models - Listado de todos los modelos del cliente prisma
     * @param prismaErrorMessage - Mensaje de error generado por prisma
     * @returns - Modelo donde se generó el error
     */
    private getErrorEntity(req: any): string {
        if (req.url === '/auth/signup') {
            return 'User';
        } else if(req.url === '/categories') {
            return 'Category';
        } else if(req.url === '/products') {
            return 'Product';
        }
        else {
            return '';
        }
    }
}