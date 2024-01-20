import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<UserEntity>;
    findAll(): Promise<UserEntity[]>;
    findOne(id: any): Promise<UserEntity>;
    update(id: any, updateUserDto: UpdateUserDto): Promise<UserEntity>;
    remove(id: any): Promise<UserEntity>;
    removeById(id: string): Promise<UserEntity>;
}
