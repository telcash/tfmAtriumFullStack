

export const ProductAvailability = {
  ALWAYS: "ALWAYS",
  NEVER: "NEVER",
  STOCK: "STOCK"
} as const;

export type ProductAvailability = typeof ProductAvailability[keyof typeof ProductAvailability];