import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';
import { UpdateCartItemDto } from '../dto/update-cart-item.dto';
import { CreateCartItemDto } from '../dto/create-cart-item.dto';
import { CartItemsService } from '../cart-items.service';
export declare class CartItemPipe implements PipeTransform {
    private readonly req;
    private readonly productsService;
    private readonly cartItemsService;
    constructor(req: any, productsService: ProductsService, cartItemsService: CartItemsService);
    transform(dto: CreateCartItemDto | UpdateCartItemDto, metadata: ArgumentMetadata): Promise<{
        cartId: any;
        productId?: number;
        quantity?: number;
        price?: number;
    }>;
}
