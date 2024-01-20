import { PrismaService } from "src/prisma/prisma.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserRole } from "./constants/user-role";
export declare class UsersRepository {
    private prisma;
    constructor(prisma: PrismaService);
    create(createUserDto: CreateUserDto): Promise<{
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
    }>;
    findAll(): Promise<{
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
    }[]>;
    findUserByEmail(email: string): Promise<{
        cart: {
            id: number;
            userId: number;
            total: number;
            createdAt: Date;
            updatedAt: Date;
            addressId: number;
        };
        addresses: {
            id: number;
            userId: number;
            street: string;
            postalCode: string;
            city: string;
            country: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
        orders: {
            id: number;
            userId: number;
            total: number;
            paymentIntent: string;
            status: string;
            addressId: number;
            createdAt: Date;
            updatedAt: Date;
        }[];
    } & {
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
    }>;
    findUserById(id: number): Promise<{
        cart: {
            id: number;
            userId: number;
            total: number;
            createdAt: Date;
            updatedAt: Date;
            addressId: number;
        };
        addresses: {
            id: number;
            userId: number;
            street: string;
            postalCode: string;
            city: string;
            country: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
        orders: {
            id: number;
            userId: number;
            total: number;
            paymentIntent: string;
            status: string;
            addressId: number;
            createdAt: Date;
            updatedAt: Date;
        }[];
    } & {
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
    }>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<{
        cart: {
            id: number;
            userId: number;
            total: number;
            createdAt: Date;
            updatedAt: Date;
            addressId: number;
        };
        addresses: {
            id: number;
            userId: number;
            street: string;
            postalCode: string;
            city: string;
            country: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
        orders: {
            id: number;
            userId: number;
            total: number;
            paymentIntent: string;
            status: string;
            addressId: number;
            createdAt: Date;
            updatedAt: Date;
        }[];
    } & {
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
    }>;
    remove(id: number): Promise<{
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
    }>;
    countUsersByRole(role: UserRole): Promise<number>;
}
