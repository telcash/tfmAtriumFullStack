import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

/**
 * Servicio para el hashing de data. Utiliza la librería bcrypt
 */
@Injectable()
export class HashService {

    /**
     * Realiza el hashing de una cadena de texto
     * @param {string} data - Cadena de texto a hashear
     * @returns {string} - Cadena de texto hasheada
     */
    async hashData(data: string): Promise<string> {
        const salt = await bcrypt.genSalt();
        return bcrypt.hash(data, salt);
    }

    /**
     * Comprueba si una cadena de texto se corresponde con un hash
     * @param {string} data - Cadena de texto a comparar
     * @param {string} hash - Hash al que comparar cadena de texto
     * @returns {string} - true si la cadena de texto y el hash se corresponden
     */
    async isMatch(data: string, hash: string): Promise<boolean> {
        return bcrypt.compare(data, hash)
    }

}
