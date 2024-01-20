export declare const UserRole: {
    readonly CLIENT: "CLIENT";
    readonly GUEST: "GUEST";
    readonly ADMIN: "ADMIN";
};
export type UserRole = typeof UserRole[keyof typeof UserRole];
