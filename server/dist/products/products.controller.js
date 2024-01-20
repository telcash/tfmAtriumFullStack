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
exports.ProductsController = void 0;
const common_1 = require("@nestjs/common");
const products_service_1 = require("./products.service");
const create_product_dto_1 = require("./dto/create-product.dto");
const update_product_dto_1 = require("./dto/update-product.dto");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const jwt_access_guard_1 = require("../auth/guards/jwt-access.guard");
const role_guard_1 = require("../auth/guards/role.guard");
const platform_express_1 = require("@nestjs/platform-express");
const image_validation_pipe_1 = require("../common/pipes/image-validation.pipe");
const storage_service_1 = require("../common/services/storage.service");
const product_entity_1 = require("./entities/product.entity");
const user_role_1 = require("../users/constants/user-role");
const user_decorator_1 = require("../users/decorators/user.decorator");
const set_req_user_interceptor_1 = require("../auth/interceptors/set-req-user.interceptor");
const set_request_user_cart_interceptor_1 = require("../carts/interceptors/set-request-user-cart.interceptor");
let ProductsController = exports.ProductsController = class ProductsController {
    constructor(productsService) {
        this.productsService = productsService;
    }
    async create(fileName, createProductDto) {
        return new product_entity_1.ProductEntity(await this.productsService.create(createProductDto, fileName));
    }
    async findAll(role, cart, categoryId) {
        const products = await this.productsService.findAll(role, +categoryId, cart.id);
        return products.map((product) => new product_entity_1.ProductEntity(product));
    }
    async findOne(id, role) {
        return await new product_entity_1.ProductEntity(await this.productsService.findOne(+id, role));
    }
    async update(id, file, updateProductDto) {
        return new product_entity_1.ProductEntity(await this.productsService.update(+id, updateProductDto, file));
    }
    async remove(id) {
        return new product_entity_1.ProductEntity(await this.productsService.remove(+id));
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, role_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)(user_role_1.UserRole.ADMIN),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', storage_service_1.StorageService.saveImageOptions)),
    (0, common_1.Post)(),
    __param(0, (0, common_1.UploadedFile)(image_validation_pipe_1.ImageValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_product_dto_1.CreateProductDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "create", null);
__decorate([
    (0, common_1.UseInterceptors)(set_req_user_interceptor_1.SetRequestUserInterceptor, set_request_user_cart_interceptor_1.SetRequestUserCartInterceptor),
    (0, common_1.Get)(),
    __param(0, (0, user_decorator_1.User)('role')),
    __param(1, (0, user_decorator_1.User)('cart')),
    __param(2, (0, common_1.Query)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseInterceptors)(set_req_user_interceptor_1.SetRequestUserInterceptor),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, role_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)(user_role_1.UserRole.ADMIN),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', storage_service_1.StorageService.saveImageOptions)),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFile)(image_validation_pipe_1.ImageValidationPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, update_product_dto_1.UpdateProductDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, role_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)(user_role_1.UserRole.ADMIN),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "remove", null);
exports.ProductsController = ProductsController = __decorate([
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], ProductsController);
//# sourceMappingURL=products.controller.js.map