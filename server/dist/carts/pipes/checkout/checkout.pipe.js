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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckoutPipe = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const addresses_service_1 = require("../../../addresses/addresses.service");
const order_status_1 = require("../../../orders/constants/order-status");
const user_role_1 = require("../../../users/constants/user-role");
const users_service_1 = require("../../../users/users.service");
let CheckoutPipe = exports.CheckoutPipe = class CheckoutPipe {
    constructor(req, usersService, addressesService) {
        this.req = req;
        this.usersService = usersService;
        this.addressesService = addressesService;
    }
    async transform(checkoutCartDto, metadata) {
        checkoutCartDto.cart = this.req.user.cart;
        if (checkoutCartDto.cart.products.length === 0) {
            throw new common_1.BadRequestException("Cart is empty");
        }
        if (this.req.user.sub) {
            checkoutCartDto.userId = this.req.user.sub;
        }
        else {
            const user = await this.usersService.findUserById(checkoutCartDto.userId);
            if (!user) {
                throw new common_1.BadRequestException("User does not exist");
            }
            if (user.role !== user_role_1.UserRole.GUEST) {
                throw new common_1.BadRequestException("User exists, you need to log in");
            }
        }
        const address = await this.addressesService.findOne(checkoutCartDto.addressId, checkoutCartDto.userId);
        if (!address) {
            throw new common_1.BadRequestException('The user has not registered the shipping address provided');
        }
        checkoutCartDto.createOrderDto = {
            userId: checkoutCartDto.userId,
            total: checkoutCartDto.cart.total,
            status: order_status_1.OrderStatus.STARTED,
            stripeClientSecret: '',
            addressId: checkoutCartDto.addressId,
        };
        const items = [];
        for (const product of checkoutCartDto.cart.products) {
            const { cartId, createdAt, updatedAt } = product, item = __rest(product, ["cartId", "createdAt", "updatedAt"]);
            items.push(item);
        }
        checkoutCartDto.items = items;
        return checkoutCartDto;
    }
};
exports.CheckoutPipe = CheckoutPipe = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.REQUEST }),
    __param(0, (0, common_1.Inject)(core_1.REQUEST)),
    __metadata("design:paramtypes", [Object, users_service_1.UsersService,
        addresses_service_1.AddressesService])
], CheckoutPipe);
//# sourceMappingURL=checkout.pipe.js.map