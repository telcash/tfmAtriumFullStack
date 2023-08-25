/**
 * Definición de los status de una orden
 */
export const OrderStatus = {
    STARTED: "INICIADA",
    CANCELLED: "CANCELADA",
    PAYID: "PAGADA",
    COMPLETED: "COMPLETADA",
  } as const;
  
  export type OrderStatus = typeof OrderStatus[keyof typeof OrderStatus];