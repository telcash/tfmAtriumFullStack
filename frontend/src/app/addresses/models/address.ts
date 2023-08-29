/**
 * Interface que modela una dirección de usuario
 */
export interface Address {
    id?: number;
    street: string;
    postalCode: string;
    city: string;
    country: string;
}
