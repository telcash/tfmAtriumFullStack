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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartItemPipe = void 0;
const common_1 = require("@nestjs/common");
const products_service_1 = require("../../../products/products.service");
const product_availability_1 = require("../../../products/constants/product-availability");
const core_1 = require("@nestjs/core");
let CartItemPipe = exports.CartItemPipe = class CartItemPipe {
    constructor(req, productsService) {
        this.req = req;
        this.productsService = productsService;
    }
    async transform(dto, metadata) {
        const cartId = this.req.user.cart.id;
        if (this.req.method === 'DELETE') {
            return Object.assign(Object.assign({}, dto), { cartId: cartId });
        }
        const product = await this.productsService.findOne(dto.productId);
        if (!product || product.availability === product_availability_1.ProductAvailability.NEVER) {
            throw new common_1.BadRequestException("Product not available");
        }
        if (product.availability === product_availability_1.ProductAvailability.STOCK &&
            product.stock < dto.quantity) {
            throw new common_1.BadRequestException("Insufficient product stock");
        }
        return Object.assign(Object.assign({}, dto), { cartId: cartId, price: product.price });
    }
};
exports.CartItemPipe = CartItemPipe = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.REQUEST }),
    __param(0, (0, common_1.Inject)(core_1.REQUEST)),
    __metadata("design:paramtypes", [Object, products_service_1.ProductsService])
], CartItemPipe);
//# sourceMappingURL=cart-item.pipe.js.map