"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const multer_1 = require("multer");
const path = require("path");
const uuid_1 = require("uuid");
const imagesDestination = './uploads/img/products/';
let StorageService = exports.StorageService = class StorageService {
    constructor() {
        this.imagesDestination = imagesDestination;
    }
    async getFileTypeFromFile(file) {
        const { fileTypeFromFile } = await import('file-type');
        return await fileTypeFromFile(file);
    }
    deleteFile(destination, filename) {
        const file = destination + filename;
        fs.unlink(file, (err) => {
            if (err) {
                return err;
            }
        });
    }
};
StorageService.saveImageOptions = {
    storage: (0, multer_1.diskStorage)({
        destination: imagesDestination,
        filename: (req, file, cb) => {
            const fileExtension = path.extname(file.originalname);
            const fileName = (0, uuid_1.v4)() + fileExtension;
            cb(null, fileName);
        }
    }),
};
exports.StorageService = StorageService = __decorate([
    (0, common_1.Injectable)()
], StorageService);
//# sourceMappingURL=storage.service.js.map