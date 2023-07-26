import { CartItemsService } from './cart-items.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { CartItemEntity } from './entities/cart-item.entity';
export declare class CartItemsController {
    private readonly cartItemsService;
    constructor(cartItemsService: CartItemsService);
    findAllItems(cart: any): Promise<CartItemEntity[]>;
    create(createCartItemDto: CreateCartItemDto): Promise<CartItemEntity>;
    update(updateCartItemDto: UpdateCartItemDto): Promise<CartItemEntity>;
    remove(updateCartItemDto: UpdateCartItemDto): Promise<CartItemEntity>;
}
