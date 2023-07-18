import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { StorageService } from '../services/storage.service';

/**
 * Pipe para la validación de imágenes subidas por el cliente
 * Valida imágenes previamente procesadas con {@link StorageService}
 * Si la imagen es valida retorna un string con el nombre de la imagen almacenada
 * Si la imagen no es válida o no hay imagen retorna null
 */
@Injectable()
export class ImageValidationPipe implements PipeTransform {
  constructor(private storageService: StorageService) {}

  /**
   * Implementación del método de validación del Pipe
   * @param {Express.Multer.File} file - Imagen a validar
   * @param {ArgumentMetadata} metadata - Metadata
   * @returns {Express.Multer.File} - Imagen validada
   */
  async transform(file: Express.Multer.File, metadata: ArgumentMetadata): Promise<string> {

    let fileName: string = null;

    // Array de errores en la validación
    const errors: string[] = [];

    if(!file) {
      return fileName;
    }

    // Tamaño máximo de la imagen en Kb
    const fileMaxSize = 10000000;
    // Tipos de archivos de imagen permitidos
    const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpeg'];

    // Tipo de imagen analizando el archivo (magic number) con Storage Service
    const fileType =  await this.storageService.getFileTypeFromFile(file.path);

    // Validación del tamaño de archivo
    if (file.size > fileMaxSize) {
      errors.push(`File exceeds maximum size: ${fileMaxSize}`)
    }

    // Validación del tipo de archivo por su extensión
    if (!allowedMimeTypes.includes(file.mimetype)) {
      errors.push('File extension not allowed');
    }

    // Validación del tipo de archivo según analisis de StorageService
    if(!allowedMimeTypes.includes(fileType.mime)) {
      errors.push('File extension invalid')
    }

    // Si hay errores el archivo no es válido, se elimina el archivo y se lanza error
    if (errors.length > 0) {
      this.storageService.deleteFile(file.destination, file.filename);
      throw new BadRequestException(`Image validation failed: ${errors}`)
    }

    // Si no hay errores retorna el nombre del archivo
    fileName = file.filename;
    return fileName;
  }
}