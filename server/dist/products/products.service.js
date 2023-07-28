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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const storage_service_1 = require("../common/services/storage.service");
const products_repository_1 = require("./products.repository");
const user_role_1 = require("../users/constants/user-role");
let ProductsService = exports.ProductsService = class ProductsService {
    constructor(productsRepository, storageService) {
        this.productsRepository = productsRepository;
        this.storageService = storageService;
    }
    async create(createProductDto, fileName) {
        return await this.productsRepository.create(Object.assign(Object.assign({}, createProductDto), { image: fileName }));
    }
    async findAll(role) {
        if (role === user_role_1.UserRole.ADMIN) {
            return await this.productsRepository.findAll();
        }
        return await this.productsRepository.findAllForClients();
    }
    async findOne(id, role) {
        if (role && role === user_role_1.UserRole.ADMIN) {
            return await this.productsRepository.findOne(id);
        }
        return await this.productsRepository.findOneForClients(id);
    }
    async update(id, updateProductDto, fileName) {
        if (fileName) {
            const oldImage = (await this.productsRepository.findOne(id)).image;
            if (oldImage) {
                this.storageService.deleteFile(this.storageService.imagesDestination, oldImage);
            }
        }
        return await this.productsRepository.update(id, Object.assign(Object.assign({}, updateProductDto), { image: fileName }));
    }
    async remove(id) {
        const product = await this.productsRepository.remove(id);
        if (product && product.image) {
            this.storageService.deleteFile(this.storageService.imagesDestination, product.image);
        }
        return product;
    }
    async updateOnCartCheckout(products) {
        return await this.productsRepository.updateOnCartCheckout(products);
    }
    async rollbackCartCheckout(products) {
        return await this.productsRepository.rollbackCartCheckout(products);
    }
};
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [products_repository_1.ProductsRepository,
        storage_service_1.StorageService])
], ProductsService);
//# sourceMappingURL=products.service.js.map