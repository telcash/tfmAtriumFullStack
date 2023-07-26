/// <reference types="multer" />
export declare class StorageService {
    imagesDestination: string;
    static saveImageOptions: {
        storage: import("multer").StorageEngine;
    };
    getFileTypeFromFile(file: string): Promise<any>;
    deleteFile(destination: string, filename: string): void;
}
