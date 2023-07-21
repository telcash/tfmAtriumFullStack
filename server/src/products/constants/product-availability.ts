
/**
 * Definición de los valores válidos para la propiedad availability de los productos
 */
export const ProductAvailability = {
  ALWAYS: "ALWAYS",
  NEVER: "NEVER",
  STOCK: "STOCK"
} as const;

export type ProductAvailability = typeof ProductAvailability[keyof typeof ProductAvailability];