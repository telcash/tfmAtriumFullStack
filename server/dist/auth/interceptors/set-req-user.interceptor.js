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
exports.SetRequestUserInterceptor = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let SetRequestUserInterceptor = exports.SetRequestUserInterceptor = class SetRequestUserInterceptor {
    constructor(jwtService, configService) {
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async intercept(context, next) {
        const req = context.switchToHttp().getRequest();
        const token = req.headers.authorization ? req.headers.authorization.replace('Bearer', '').trim() : null;
        if (token) {
            await this.jwtService.verifyAsync(token, {
                secret: this.configService.get('JWT_ACCESS_SECRET'),
            })
                .then((payload) => {
                req.user = payload;
            })
                .catch(() => {
                throw new common_1.UnauthorizedException;
            });
        }
        return next.handle();
    }
};
exports.SetRequestUserInterceptor = SetRequestUserInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService, config_1.ConfigService])
], SetRequestUserInterceptor);
//# sourceMappingURL=set-req-user.interceptor.js.map