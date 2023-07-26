export declare const OrderStatus: {
    readonly STARTED: "STARTED";
    readonly CANCELLED: "CANCELLED";
    readonly COMPLETED: "COMPLETED";
};
export type OrderStatus = typeof OrderStatus[keyof typeof OrderStatus];
