import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { StorageService } from '../services/storage.service';

@Injectable()
export class ImageValidationPipe implements PipeTransform {
  constructor(private storageService: StorageService) {}
  async transform(value: any, metadata: ArgumentMetadata) {
    const errors: string[] = [];
    if (value) {
      const fileMaxSize = 1000;
      const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpeg'];
      const fileType =  await this.storageService.getFileTypeFromFile(value.path);

      if (value.size > fileMaxSize) {
        errors.push(`File exceeds maximum size: ${fileMaxSize}`)
      }

      if (!allowedMimeTypes.includes(value.mimetype)) {
        errors.push('File extension not allowed');
      }

      if(!allowedMimeTypes.includes(fileType.mime)) {
        errors.push('File extension invalid')
      }
    }

    if (errors.length > 0) {
      this.storageService.deleteFile(value.path);
      throw new BadRequestException(`Image validation failed: ${errors}`)
    }

    return value;
  }
}