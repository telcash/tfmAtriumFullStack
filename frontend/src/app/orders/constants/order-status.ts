/**
 * Definición de los status de una orden
 */
export const OrderStatus = {
    STARTED: "INICIADA",
    CANCELLED: "CANCELADA",
    PAID: "PAGADA",
    COMPLETED: "COMPLETADA",
  } as const;
  
  export type OrderStatus = typeof OrderStatus[keyof typeof OrderStatus];