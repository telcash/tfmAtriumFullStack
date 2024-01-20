import { RawBodyRequest } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { StripeClientSecretEntity } from './entities/stripe-client-secret.entity';
export declare class StripeController {
    private readonly stripeService;
    constructor(stripeService: StripeService);
    handleStripeRequest(req: RawBodyRequest<any>, res: any): Promise<void>;
    createPaymentIntent(orderId: string, userId: number): Promise<StripeClientSecretEntity>;
}
