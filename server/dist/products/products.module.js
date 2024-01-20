"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsModule = void 0;
const common_1 = require("@nestjs/common");
const products_service_1 = require("./products.service");
const products_controller_1 = require("./products.controller");
const products_repository_1 = require("./products.repository");
const product_categories_module_1 = require("./product-categories/product-categories.module");
const carts_module_1 = require("../carts/carts.module");
let ProductsModule = exports.ProductsModule = class ProductsModule {
};
exports.ProductsModule = ProductsModule = __decorate([
    (0, common_1.Module)({
        controllers: [products_controller_1.ProductsController],
        providers: [products_service_1.ProductsService, products_repository_1.ProductsRepository],
        exports: [products_service_1.ProductsService],
        imports: [(0, common_1.forwardRef)(() => carts_module_1.CartsModule), product_categories_module_1.ProductCategoriesModule],
    })
], ProductsModule);
//# sourceMappingURL=products.module.js.map