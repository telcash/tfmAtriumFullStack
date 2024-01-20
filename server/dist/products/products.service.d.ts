import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { StorageService } from 'src/common/services/storage.service';
import { ProductsRepository } from './products.repository';
import { ProductEntity } from './entities/product.entity';
import { UserRole } from 'src/users/constants/user-role';
import { UpdateCartItemDto } from 'src/carts/cart-items/dto/update-cart-item.dto';
export declare class ProductsService {
    private readonly productsRepository;
    private readonly storageService;
    constructor(productsRepository: ProductsRepository, storageService: StorageService);
    create(createProductDto: CreateProductDto, fileName: string): Promise<{
        id: number;
        name: string;
        description: string;
        price: number;
        image: string;
        stock: number;
        availability: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(role: UserRole, categoryId?: number, cartId?: number): Promise<{
        categories: {
            id: number;
            name: string;
        }[];
        id: number;
        name: string;
        description: string;
        price: number;
        image: string;
        stock: number;
        availability: string;
        createdAt: Date;
        updatedAt: Date;
    }[] | ({
        cartsItem: {
            quantity: number;
        }[];
        categories: {
            category: {
                name: string;
            };
        }[];
    } & {
        id: number;
        name: string;
        description: string;
        price: number;
        image: string;
        stock: number;
        availability: string;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findOne(id: number, role?: UserRole): Promise<{
        id: number;
        name: string;
        description: string;
        price: number;
        image: string;
        stock: number;
        availability: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: number, updateProductDto: UpdateProductDto, fileName: string): Promise<{
        id: number;
        name: string;
        description: string;
        price: number;
        image: string;
        stock: number;
        availability: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: number): Promise<ProductEntity>;
    updateOnCartCheckout(updateCartItemDto: UpdateCartItemDto[]): Promise<any[]>;
    rollbackInventory(updateCartItemDto: UpdateCartItemDto[]): Promise<any[]>;
}
