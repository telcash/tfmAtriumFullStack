import { CreateOrderDto } from "src/orders/dto/create-order.dto";
export declare class CheckoutCartDto {
    [x: string]: {};
    userId?: number;
    addressId?: number;
    cart?: any;
    createOrderDto: CreateOrderDto;
    items: any[];
}
