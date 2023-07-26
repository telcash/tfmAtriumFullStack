import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { HashService } from 'src/common/services/hash.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
export declare class SignupPipe implements PipeTransform {
    private readonly hashService;
    constructor(hashService: HashService);
    transform(createUserDto: CreateUserDto, metadata: ArgumentMetadata): Promise<CreateUserDto>;
}
