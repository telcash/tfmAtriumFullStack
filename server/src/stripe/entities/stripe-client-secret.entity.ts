

export class StripeClientSecretEntity {
    constructor(partial: Partial<StripeClientSecretEntity>) {
        Object.assign(this, partial)
    }

    clientSecret: string;
}