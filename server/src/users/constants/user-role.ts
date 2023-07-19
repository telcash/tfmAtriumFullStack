import { UserRole as PrismaUserRole } from '@prisma/client';

export const UserRole = {
  CLIENT: PrismaUserRole.CLIENT,
  ADMIN: PrismaUserRole.ADMIN,
} as const;

export type UserRole = typeof UserRole[keyof typeof UserRole];