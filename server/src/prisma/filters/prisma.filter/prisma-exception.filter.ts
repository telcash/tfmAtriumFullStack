import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Prisma } from '@prisma/client';


// Filtro para capturar excepciones generadas por Prisma
// Faltan ajustes de mensajes para usuarios
// Genera aún mensajes que no se corresponden al error, particularmente la equivocación está en el nombre de la entidad que lo genera

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    // Instancias para acceder al request y response
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    // Determinamos en que modelo de prisma se generó el error
    const models = Prisma.ModelName;
    const prismaErrorMessage = exception.message;
    const model = this.getErrorModel(models, prismaErrorMessage);

    // Constante para mapeo de la respuesta del error
    const responses= {
      P2000: {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Invalid provided value'
      },
      P2002: {
        statusCode: HttpStatus.BAD_REQUEST,
        message: `${model} already exists`,
      },
      P2003: {
        statusCode: HttpStatus.BAD_REQUEST,
        message:`${model} already exists`,
      },
      P2025: {
        statusCode: HttpStatus.NOT_FOUND,
        message: `${model} doesn't exists`,
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
  private getErrorModel(models: any, prismaErrorMessage: string): string {
    for(const model in models) {
      if (prismaErrorMessage.includes(model))
        return model;
    }
  }
}