/**
 * Definición de los roles válidos para usuarios
 */
export const UserRole = {
  CLIENT: "CLIENT",
  GUEST: "GUEST",
  ADMIN: "ADMIN",
} as const;

export type UserRole = typeof UserRole[keyof typeof UserRole];