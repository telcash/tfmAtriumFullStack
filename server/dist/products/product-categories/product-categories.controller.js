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
exports.ProductCategoriesController = void 0;
const common_1 = require("@nestjs/common");
const product_categories_service_1 = require("./product-categories.service");
const create_product_category_dto_1 = require("./dto/create-product-category.dto");
const jwt_access_guard_1 = require("../../auth/guards/jwt-access.guard");
const role_guard_1 = require("../../auth/guards/role.guard");
const roles_decorator_1 = require("../../auth/decorators/roles.decorator");
const user_role_1 = require("../../users/constants/user-role");
let ProductCategoriesController = exports.ProductCategoriesController = class ProductCategoriesController {
    constructor(productCategoriesService) {
        this.productCategoriesService = productCategoriesService;
    }
    async create(createProductCategoryDto) {
        return this.productCategoriesService.create(createProductCategoryDto);
    }
    async remove(createProductCategoryDto) {
        return this.productCategoriesService.remove(createProductCategoryDto);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_category_dto_1.CreateProductCategoryDto]),
    __metadata("design:returntype", Promise)
], ProductCategoriesController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_category_dto_1.CreateProductCategoryDto]),
    __metadata("design:returntype", Promise)
], ProductCategoriesController.prototype, "remove", null);
exports.ProductCategoriesController = ProductCategoriesController = __decorate([
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, role_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)(user_role_1.UserRole.ADMIN),
    (0, common_1.Controller)('product-categories'),
    __metadata("design:paramtypes", [product_categories_service_1.ProductCategoriesService])
], ProductCategoriesController);
//# sourceMappingURL=product-categories.controller.js.map