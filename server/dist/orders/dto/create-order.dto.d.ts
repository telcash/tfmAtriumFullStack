export declare class CreateOrderDto {
    id?: number;
    userId: number;
    total: number;
    status: string;
    stripeClientSecret: string;
    addressId: number;
}
