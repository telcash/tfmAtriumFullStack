import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { StorageService } from '../services/storage.service';

/**
 * Pipe para la validación de imágenes subidas por el cliente
 */
@Injectable()
export class ImageValidationPipe implements PipeTransform {
  constructor(private storageService: StorageService) {}

  /**
   * Implementación del método de validación del Pipe
   * @param {Express.Multer.File} value - Imagen a validar
   * @param {ArgumentMetadata} metadata - Metadata
   * @returns {Express.Multer.File} - Imagen validada
   */
  async transform(value: Express.Multer.File, metadata: ArgumentMetadata) {

    // Array de errores en la validación
    const errors: string[] = [];

    if (value) {

      // Tamaño máximo de la imagen en Kb
      const fileMaxSize = 10000000;
      // Tipos de archivos de imagen permitidos
      const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpeg'];

      // Tipo de imagen analizando el archivo (magic number) con Storage Service
      const fileType =  await this.storageService.getFileTypeFromFile(value.path);

      // Validación del tamaño de archivo
      if (value.size > fileMaxSize) {
        errors.push(`File exceeds maximum size: ${fileMaxSize}`)
      }

      // Validación del tipo de archivo por su extensión
      if (!allowedMimeTypes.includes(value.mimetype)) {
        errors.push('File extension not allowed');
      }

      // Validación del tipo de archivo según analisis de StorageService
      if(!allowedMimeTypes.includes(fileType.mime)) {
        errors.push('File extension invalid')
      }
    }

    // Si hay errores el archivo no es válido, se elimina el archivo y se lanza error
    if (errors.length > 0) {
      this.storageService.deleteFile(value.destination, value.filename);
      throw new BadRequestException(`Image validation failed: ${errors}`)
    }

    // Si no hay errores retorna archivo
    return value;
  }
}