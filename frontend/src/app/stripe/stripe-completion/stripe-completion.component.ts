import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { loadStripe } from '@stripe/stripe-js';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-stripe-completion',
  templateUrl: './stripe-completion.component.html',
  styleUrls: ['./stripe-completion.component.css']
})
export class StripeCompletionComponent implements OnInit {

  status: string = '';

  constructor(
    private router: Router,
  ) {}

  /**
   * Inicializa el componente con el valor del estatus
   */
  ngOnInit(): void {
    this.checkStatus().then(
      (value) => this.status = value,
    )
    .catch(
      (err) => console.log(err),
    )
  }

  /**
   * Método que obtiene el status del pago
   * @returns {string} - Status del pago
   */
  async checkStatus(): Promise<string> {

    // Inicializa el atributo Stripe
    const stripe = await loadStripe(environment.stripe.publicKey);

    // Obtiene el client_secret del URL
    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    // Solicita al API de Stripe el estado del pago
    if(stripe && clientSecret) {
      const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);
      switch (paymentIntent?.status) {
        case 'succeeded':
          return 'Pago realizado con éxito.';
        case 'processing':
          return 'El pago se está procesando.';
        case 'requires_payment_method':
          return 'El pago no se pudo procesar, por favor intente de nuevo.';
        default:
          return 'Ha ocurrido un error.'
      } 
    }
    return '';
  }

  /**
   * Método que navega a la página principal
   */
  goHome() {
    this.router.navigateByUrl('/')
  };

  /**
   * Método que navega a la página de las ordenes de usuario
   */
  goToOrders() {
    this.router.navigateByUrl('users/orders')
  }
}

