export declare const OrderStatus: {
    readonly STARTED: "INICIADA";
    readonly WAITING_PAYMENT: "ESPERANDO PAGO";
    readonly CANCELLED: "CANCELADA";
    readonly PAID: "PAGADA";
    readonly COMPLETED: "COMPLETADA";
};
export type OrderStatus = typeof OrderStatus[keyof typeof OrderStatus];
