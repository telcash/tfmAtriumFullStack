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

  ngOnInit(): void {
    this.checkStatus().then(
      (value) => this.status = value,
    )
    .catch(
      (err) => console.log(err),
    )
  }

  async checkStatus(): Promise<string> {

    const stripe = await loadStripe(environment.stripe.publicKey);

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

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

  goHome() {
    this.router.navigateByUrl('/')
  };

  goToOrders() {
    this.router.navigateByUrl('users/orders')
  }
}

