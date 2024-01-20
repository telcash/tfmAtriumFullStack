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
exports.AddressesService = void 0;
const common_1 = require("@nestjs/common");
const addresses_repository_1 = require("./addresses.repository");
let AddressesService = exports.AddressesService = class AddressesService {
    constructor(addressesRepository) {
        this.addressesRepository = addressesRepository;
    }
    async create(userId, createAddressDto) {
        return await this.addressesRepository.create(Object.assign(Object.assign({}, createAddressDto), { userId: userId }));
    }
    async findAll(userId) {
        return await this.addressesRepository.findAll(userId);
    }
    async findOne(id, userId) {
        return await this.addressesRepository.findOne(id, userId);
    }
    async update(id, userId, updateAddressDto) {
        return await this.addressesRepository.update(id, userId, updateAddressDto);
    }
    async remove(id, userId) {
        return await this.addressesRepository.remove(id, userId);
    }
};
exports.AddressesService = AddressesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [addresses_repository_1.AddressesRepository])
], AddressesService);
//# sourceMappingURL=addresses.service.js.map