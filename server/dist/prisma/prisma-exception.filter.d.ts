import { ArgumentsHost, ExceptionFilter } from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import { Prisma } from "@prisma/client";
export declare class PrismaExceptionFilter implements ExceptionFilter {
    private readonly httpAdapterHost;
    constructor(httpAdapterHost: HttpAdapterHost);
    catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost): void;
    private getErrorEntity;
}
