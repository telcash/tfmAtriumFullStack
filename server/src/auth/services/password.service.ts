import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {

    async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt();
        return bcrypt.hash(password, salt);
    }

    async isMatch(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash)
    }

}
