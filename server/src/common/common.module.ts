import { Global, Module } from '@nestjs/common';
import { StorageService } from './services/storage.service';
import { HashService } from './services/hash.service';

/**
 * Modulo encargado de funciones comunes generales
 */
@Global()
@Module({
    providers: [StorageService, HashService],
    exports: [StorageService, HashService],
})
export class CommonModule {}
