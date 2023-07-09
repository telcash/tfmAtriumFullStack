import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {

    async hashData(data: string): Promise<string> {
        const salt = await bcrypt.genSalt();
        return bcrypt.hash(data, salt);
    }

    async isMatch(data: string, hash: string): Promise<boolean> {
        return bcrypt.compare(data, hash)
    }

}