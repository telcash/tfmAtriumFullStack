import { Controller, Post, RawBodyRequest, Request, Response } from '@nestjs/common';
import { StripeService } from './stripe.service';

/**
 * Controlador del modulo {@link StripeModule}
 */
@Controller('webhook')
export class StripeController {

    constructor(private readonly stripeService: StripeService) {}

    @Post()
    async handleStripeRequest(@Request() req: RawBodyRequest<any>, @Response() res) {
        return await this.stripeService.handleStripeRequest(req, res);
    }
}
