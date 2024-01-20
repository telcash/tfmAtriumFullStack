"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonModule = void 0;
const common_1 = require("@nestjs/common");
const storage_service_1 = require("./services/storage.service");
const hash_service_1 = require("./services/hash.service");
let CommonModule = exports.CommonModule = class CommonModule {
};
exports.CommonModule = CommonModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [storage_service_1.StorageService, hash_service_1.HashService],
        exports: [storage_service_1.StorageService, hash_service_1.HashService],
    })
], CommonModule);
//# sourceMappingURL=common.module.js.map