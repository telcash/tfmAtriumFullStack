import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { AuthService } from '../auth.service';
import { HashService } from 'src/common/services/hash.service';
export declare class PasswordUpdatePipe implements PipeTransform {
    private readonly req;
    private readonly authService;
    private readonly hashService;
    constructor(req: any, authService: AuthService, hashService: HashService);
    transform(updatePasswordDto: UpdatePasswordDto, metadata: ArgumentMetadata): Promise<{
        password: string;
    }>;
}
