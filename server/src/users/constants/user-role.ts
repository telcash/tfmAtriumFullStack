export const UserRole = {
  CLIENT: "CLIENT",
  ADMIN: "ADMIN",
} as const;

export type UserRole = typeof UserRole[keyof typeof UserRole];