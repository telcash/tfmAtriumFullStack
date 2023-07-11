import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { diskStorage } from 'multer';
import path = require('path');
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class StorageService {

    static saveImageOptions = {
        storage: diskStorage({
            destination: './uploads/img/products',
            filename: (req, file, cb) => {
                const fileExtension: string = path.extname(file.originalname);
                const fileName: string = uuidv4() + fileExtension;
                cb(null, fileName)
            }
        }),
    }

    async getFileTypeFromFile(file: string): Promise<any> {
        const { fileTypeFromFile } = await import('file-type');
        return await fileTypeFromFile(file);
    }

    deleteFile(file: string) {
        fs.unlink(file, (err) => {
            if (err) {
              return err;
            }
        });
    }
}
