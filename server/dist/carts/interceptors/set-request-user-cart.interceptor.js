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
        const req = context.switchToHttp().getRequest();
        const res = context.switchToHttp().getResponse();
        if (req.user) {
            let userCart = await this.cartsService.findOneByUserId(req.user.sub);
            if (!userCart) {
                userCart = await this.cartsService.create({ userId: req.user.sub, total: 0 });
            }
            if (req.signedCookies && req.signedCookies['cartId']) {
                await this.cartsService.mergeCarts(userCart.id, +req.signedCookies['cartId']);
                await this.cartsService.remove(+req.signedCookies['cartId']);
                res.cookie('cartId', req.signedCookies['cartId'], {
                    expires: new Date(Date.now() - 1),
                    httpOnly: true,
                    signed: true,
                    sameSite: true,
                });
            }
            req.user.cart = userCart;
        }
        else {
            if (req.signedCookies['cartId']) {
                const guestCart = await this.cartsService.findOne(+req.signedCookies['cartId']);
                req.user = { cart: guestCart };
            }
            else {
                const guestCart = await this.cartsService.create({ total: 0 });
                res.cookie('cartId', guestCart.id, {
                    expires: new Date(Date.now() + 3600 * 1000),
                    httpOnly: true,
                    signed: true,
                    sameSite: true,
                });
                req.user = { cart: guestCart };
            }
        }
        return next.handle();
    }
};
exports.SetRequestUserCartInterceptor = SetRequestUserCartInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [carts_service_1.CartsService])
], SetRequestUserCartInterceptor);
//# sourceMappingURL=set-request-user-cart.interceptor.js.map