import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { diskStorage } from 'multer';
import path = require('path');
import { v4 as uuidv4 } from 'uuid'

const imagesDestination: string = './img/products/';

/**
 * Servicio encargado de las funciones de almacenamiento
 */
@Injectable()
export class StorageService {

    // Carpeta destino de imágeness
    imagesDestination: string = imagesDestination;

    // Opciones de almacenamiento de imágenes
    static saveImageOptions = {
        storage: diskStorage({
            // Carpeta destino
            destination: imagesDestination,

            // Generaración de nombre de archivo para almacenamiento
            // Usa UUID v4
            filename: (req, file, cb) => {
                const fileExtension: string = path.extname(file.originalname);
                const fileName: string = uuidv4() + fileExtension;
                cb(null, fileName)
            }
        }),
    }

    /**
     * Obtiene el tipo de archivo analizando los primeros bits del archivo
     * @param {string} file - Dirección completa del archivo con nombre: carpeta + nombre de archivo
     * @returns {any} - El tipo de archivo o undefined
     */
    async getFileTypeFromFile(file: string): Promise<any> {
        const { fileTypeFromFile } = await import('file-type');
        return await fileTypeFromFile(file);
    }
    
    /**
     * Borra un archivo del almacenamiento
     * @param {string} destination - Carpeta de almacenamiento
     * @param {string} filename - Nombre de archivo
     */
    deleteFile(destination: string, filename: string) {
        const file: string = destination + filename;
        fs.unlink(file, (err) => {
            if (err) {
              return err;
            }
        });
    }
}
