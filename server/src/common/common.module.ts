import { Global, Module } from '@nestjs/common';
import { StorageService } from './services/storage.service';
import { HashService } from './services/hash.service';
import { ShutdownObserver } from './services/shutdownobserver.service';

/**
 * Modulo encargado de funciones comunes generales
 */
@Global()
@Module({
    providers: [StorageService, HashService, ShutdownObserver],
    exports: [StorageService, HashService, ShutdownObserver],
})
export class CommonModule {}
