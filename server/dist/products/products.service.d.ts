import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { StorageService } from 'src/common/services/storage.service';
import { ProductsRepository } from './products.repository';
import { ProductEntity } from './entities/product.entity';
import { UserRole } from 'src/users/constants/user-role';
export declare class ProductsService {
    private readonly productsRepository;
    private readonly storageService;
    constructor(productsRepository: ProductsRepository, storageService: StorageService);
    create(createProductDto: CreateProductDto, fileName: string): Promise<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        name: string;
        description: string;
        price: number;
        image: string;
        stock: number;
        availability: string;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {}>;
    findAll(role: UserRole): Promise<(import("@prisma/client/runtime/library").GetResult<{
        id: number;
        name: string;
        description: string;
        price: number;
        image: string;
        stock: number;
        availability: string;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {})[]>;
    findOne(id: number, role?: UserRole): Promise<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        name: string;
        description: string;
        price: number;
        image: string;
        stock: number;
        availability: string;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {}>;
    update(id: number, updateProductDto: UpdateProductDto, fileName: string): Promise<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        name: string;
        description: string;
        price: number;
        image: string;
        stock: number;
        availability: string;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {}>;
    remove(id: number): Promise<ProductEntity>;
    updateOnCartCheckout(products: any): Promise<any[]>;
    rollbackCartCheckout(products: any): Promise<any[]>;
}
