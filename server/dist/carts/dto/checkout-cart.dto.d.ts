import { CreateOrderDto } from "src/orders/dto/create-order.dto";
import { CreateCartItemDto } from "../cart-items/dto/create-cart-item.dto";
export declare class CheckoutCartDto {
    userId?: number;
    addressId?: number;
    cart?: any;
    createOrderDto: CreateOrderDto;
    items: CreateCartItemDto[];
}
