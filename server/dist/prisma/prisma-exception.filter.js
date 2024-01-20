"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const client_1 = require("@prisma/client");
let PrismaExceptionFilter = exports.PrismaExceptionFilter = class PrismaExceptionFilter {
    constructor(httpAdapterHost) {
        this.httpAdapterHost = httpAdapterHost;
    }
    catch(exception, host) {
        const { httpAdapter } = this.httpAdapterHost;
        const ctx = host.switchToHttp();
        const req = ctx.getRequest();
        const entity = this.getErrorEntity(req);
        const responses = {
            P2000: {
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: 'Invalid provided value'
            },
            P2002: {
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: `${entity} already exists`,
            },
            P2003: {
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: `${entity} already exists`,
            },
            P2025: {
                statusCode: common_1.HttpStatus.NOT_FOUND,
                message: `${entity} doesn't exists`,
            },
        };
        const responseBodyDefault = {
            statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Internal Server Error',
        };
        const prismaCode = exception.code;
        const responseBody = responses[prismaCode] ? responses[prismaCode] : responseBodyDefault;
        const statusCode = responseBody.statusCode;
        httpAdapter.reply(ctx.getResponse(), responseBody, statusCode);
    }
    getErrorEntity(req) {
        if (req.url === '/auth/signup') {
            return 'User';
        }
        else if (req.url === '/categories') {
            return 'Category';
        }
        else if (req.url === '/products') {
            return 'Product';
        }
        else {
            return '';
        }
    }
};
exports.PrismaExceptionFilter = PrismaExceptionFilter = __decorate([
    (0, common_1.Catch)(client_1.Prisma.PrismaClientKnownRequestError),
    __metadata("design:paramtypes", [core_1.HttpAdapterHost])
], PrismaExceptionFilter);
//# sourceMappingURL=prisma-exception.filter.js.map