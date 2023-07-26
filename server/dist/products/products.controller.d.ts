import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';
import { UserRole } from 'src/users/constants/user-role';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(file: any, createProductDto: CreateProductDto): Promise<ProductEntity>;
    findAll(role: UserRole): Promise<ProductEntity[]>;
    findOne(id: string, role: UserRole): Promise<ProductEntity>;
    update(id: string, file: any, updateProductDto: UpdateProductDto): Promise<ProductEntity>;
    remove(id: string): Promise<ProductEntity>;
}
