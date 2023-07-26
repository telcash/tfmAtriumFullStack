export declare const ProductAvailability: {
    readonly ALWAYS: "ALWAYS";
    readonly NEVER: "NEVER";
    readonly STOCK: "STOCK";
};
export type ProductAvailability = typeof ProductAvailability[keyof typeof ProductAvailability];
