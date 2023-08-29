import { Controller, Get, Param, Post, RawBodyRequest, Request, Response, UseGuards } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { JwtAccessGuard } from 'src/auth/guards/jwt-access.guard';
import { User } from 'src/users/decorators/user.decorator';
import { StripeClientSecretEntity } from './entities/stripe-client-secret.entity';

/**
 * Controlador del modulo {@link StripeModule}
 */
@Controller('stripe')
export class StripeController {

    constructor(private readonly stripeService: StripeService) {}

    /**
     * Endpoint para recibir peticiones de Stripe
     * Recibe una petición cada vez que hay una actualización de un paymentIntent de stripe
     * @param req - Objeto request de la petición
     * @param res - Objeto response de la petición
     * @returns - 
     */
    @Post('webhook')
    async handleStripeRequest(@Request() req: RawBodyRequest<any>, @Response() res) {
        return await this.stripeService.handleStripeRequest(req, res);
    }

    /**
     * Endpoint para la solicitud de creación de un nuevo paymentIntent de Stripe
     * @param {number} orderId - Id de la orden
     * @param {number} userId - Id del usuario 
     * @returns {StripeClientSecretEntity} - Objeto con la clave única para el cliente realizar el pago
     */
    @UseGuards(JwtAccessGuard)
    @Get(':id')
    async createPaymentIntent(@Param('id') orderId: string, @User('sub') userId: number): Promise<StripeClientSecretEntity> {
        return new StripeClientSecretEntity(await this.stripeService.createPaymentIntent(+orderId, userId));
    }

}
