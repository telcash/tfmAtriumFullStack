/**
 * Definición de los status de una orden
 */
export const OrderStatus = {
    STARTED: "STARTED",
    CANCELLED: "CANCELLED",
    COMPLETED: "COMPLETED"
  } as const;
  
  export type OrderStatus = typeof OrderStatus[keyof typeof OrderStatus];