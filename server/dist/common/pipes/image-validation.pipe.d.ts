/// <reference types="multer" />
import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { StorageService } from '../services/storage.service';
export declare class ImageValidationPipe implements PipeTransform {
    private readonly storageService;
    constructor(storageService: StorageService);
    transform(file: Express.Multer.File, metadata: ArgumentMetadata): Promise<string>;
}
