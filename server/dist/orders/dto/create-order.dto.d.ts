export declare class CreateOrderDto {
    id?: number;
    userId: number;
    total: number;
    status: string;
    paymentIntent?: string;
    addressId: number;
}
