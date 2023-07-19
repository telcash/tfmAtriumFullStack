import { ProductAvailability as PrismaProductAvailability } from '@prisma/client';

export const ProductAvailability = {
  ALWAYS: PrismaProductAvailability.ALWAYS,
  NEVER: PrismaProductAvailability.NEVER,
  STOCK: PrismaProductAvailability.STOCK
} as const;

export type ProductAvailability = typeof ProductAvailability[keyof typeof ProductAvailability];