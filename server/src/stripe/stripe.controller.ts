import { Controller, Get, Param, Post, RawBodyRequest, Request, Response, UseGuards } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { JwtAccessGuard } from 'src/auth/guards/jwt-access.guard';
import { User } from 'src/users/decorators/user.decorator';

/**
 * Controlador del modulo {@link StripeModule}
 */
@Controller('stripe')
export class StripeController {

    constructor(private readonly stripeService: StripeService) {}

    @Post('webhook')
    async handleStripeRequest(@Request() req: RawBodyRequest<any>, @Response() res) {
        return await this.stripeService.handleStripeRequest(req, res);
    }

    @UseGuards(JwtAccessGuard)
    @Get(':id')
    async createPaymentIntent(@Param('id') orderId: string, @User('sub') userId: number) {
        return await this.stripeService.createPaymentIntent(+orderId, userId);
    }

}
