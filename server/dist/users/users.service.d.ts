import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserRole } from './constants/user-role';
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: UsersRepository);
    create(createUserDto: CreateUserDto): Promise<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        role: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        mobile: string;
        refreshToken: string;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {}>;
    findAll(): Promise<(import("@prisma/client/runtime/library").GetResult<{
        id: number;
        role: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        mobile: string;
        refreshToken: string;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {})[]>;
    findUserByEmail(email: string): Promise<{
        addresses: (import("@prisma/client/runtime/library").GetResult<{
            id: number;
            userId: number;
            street: string;
            postalCode: string;
            city: string;
            country: string;
            createdAt: Date;
            updatedAt: Date;
        }, unknown> & {})[];
        orders: (import("@prisma/client/runtime/library").GetResult<{
            id: number;
            userId: number;
            total: number;
            status: string;
            stripeClientSecret: string;
            addressId: number;
            createdAt: Date;
            updatedAt: Date;
        }, unknown> & {})[];
        cart: import("@prisma/client/runtime/library").GetResult<{
            id: number;
            userId: number;
            total: number;
            createdAt: Date;
            updatedAt: Date;
        }, unknown> & {};
    } & import("@prisma/client/runtime/library").GetResult<{
        id: number;
        role: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        mobile: string;
        refreshToken: string;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {}>;
    findUserById(id: number): Promise<{
        addresses: (import("@prisma/client/runtime/library").GetResult<{
            id: number;
            userId: number;
            street: string;
            postalCode: string;
            city: string;
            country: string;
            createdAt: Date;
            updatedAt: Date;
        }, unknown> & {})[];
        orders: (import("@prisma/client/runtime/library").GetResult<{
            id: number;
            userId: number;
            total: number;
            status: string;
            stripeClientSecret: string;
            addressId: number;
            createdAt: Date;
            updatedAt: Date;
        }, unknown> & {})[];
        cart: import("@prisma/client/runtime/library").GetResult<{
            id: number;
            userId: number;
            total: number;
            createdAt: Date;
            updatedAt: Date;
        }, unknown> & {};
    } & import("@prisma/client/runtime/library").GetResult<{
        id: number;
        role: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        mobile: string;
        refreshToken: string;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {}>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<{
        addresses: (import("@prisma/client/runtime/library").GetResult<{
            id: number;
            userId: number;
            street: string;
            postalCode: string;
            city: string;
            country: string;
            createdAt: Date;
            updatedAt: Date;
        }, unknown> & {})[];
        orders: (import("@prisma/client/runtime/library").GetResult<{
            id: number;
            userId: number;
            total: number;
            status: string;
            stripeClientSecret: string;
            addressId: number;
            createdAt: Date;
            updatedAt: Date;
        }, unknown> & {})[];
        cart: import("@prisma/client/runtime/library").GetResult<{
            id: number;
            userId: number;
            total: number;
            createdAt: Date;
            updatedAt: Date;
        }, unknown> & {};
    } & import("@prisma/client/runtime/library").GetResult<{
        id: number;
        role: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        mobile: string;
        refreshToken: string;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {}>;
    remove(id: number): Promise<UserEntity>;
    countUsersByRole(role: UserRole): Promise<number>;
}
