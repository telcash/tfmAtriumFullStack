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
exports.SetRequestUserCartInterceptor = void 0;
const common_1 = require("@nestjs/common");
const carts_service_1 = require("../carts.service");
let SetRequestUserCartInterceptor = exports.SetRequestUserCartInterceptor = class SetRequestUserCartInterceptor {
    constructor(cartsService) {
        this.cartsService = cartsService;
    }
    async intercept(context, next) {
        const createCartDto = { total: 0 };
        const req = context.switchToHttp().getRequest();
        if (req.user) {
            let cart = await this.cartsService.findOneByUserId(req.user.sub);
            if (!cart) {
                cart = await this.cartsService.create(Object.assign(Object.assign({}, createCartDto), { userId: req.user.sub }));
            }
            req.user.cart = cart;
            return next.handle();
        }
        if (req.signedCookies['cartId']) {
            const cart = await this.cartsService.findOne(+req.signedCookies['cartId']);
            req.user = {
                cart: cart,
            };
            return next.handle();
        }
        const cart = await this.cartsService.create(createCartDto);
        req.user = {
            cart: cart,
        };
        const res = context.switchToHttp().getResponse();
        res.cookie('cartId', cart.id, {
            httpOnly: true,
            signed: true,
            sameSite: true,
        });
        return next.handle();
    }
};
exports.SetRequestUserCartInterceptor = SetRequestUserCartInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [carts_service_1.CartsService])
], SetRequestUserCartInterceptor);
//# sourceMappingURL=set-request-user-cart.interceptor.js.map