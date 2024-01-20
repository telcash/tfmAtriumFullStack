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
exports.ImageValidationPipe = void 0;
const common_1 = require("@nestjs/common");
const storage_service_1 = require("../services/storage.service");
const sizeOf = require('image-size');
let ImageValidationPipe = exports.ImageValidationPipe = class ImageValidationPipe {
    constructor(storageService) {
        this.storageService = storageService;
    }
    async transform(file, metadata) {
        let fileName = null;
        const errors = [];
        if (!file) {
            return fileName;
        }
        const fileMaxSize = 10000000;
        const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpeg'];
        const fileType = await this.storageService.getFileTypeFromFile(file.path);
        if (file.size > fileMaxSize) {
            errors.push(`File exceeds maximum size: ${fileMaxSize}`);
        }
        if (!allowedMimeTypes.includes(file.mimetype)) {
            errors.push('File extension not allowed');
        }
        if (!allowedMimeTypes.includes(fileType.mime)) {
            errors.push('File extension invalid');
        }
        if (errors.length === 0) {
            const minDimension = 400;
            const dimensions = sizeOf(file.path);
            if (dimensions.width !== dimensions.height || dimensions.width < minDimension) {
                errors.push('File dimensions invalids');
            }
        }
        if (errors.length > 0) {
            this.storageService.deleteFile(file.destination, file.filename);
            throw new common_1.BadRequestException(`Image validation failed: ${errors}`);
        }
        fileName = file.filename;
        return fileName;
    }
};
exports.ImageValidationPipe = ImageValidationPipe = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [storage_service_1.StorageService])
], ImageValidationPipe);
//# sourceMappingURL=image-validation.pipe.js.map