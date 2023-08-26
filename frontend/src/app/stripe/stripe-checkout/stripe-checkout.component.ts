import { Component, Input, OnInit } from '@angular/core';
import { Appearance, Stripe, StripeElements, loadStripe } from '@stripe/stripe-js';
import { environment } from 'src/environments/environment.development';


@Component({
  selector: 'app-stripe-checkout',
  templateUrl: './stripe-checkout.component.html',
  styleUrls: ['./stripe-checkout.component.css']
})


export class StripeCheckoutComponent implements OnInit {

  emailAddress = '';
  stripe!: Stripe | null;
  elements!: StripeElements;


  constructor() {}

  ngOnInit(): void {
    this.initialize();
  }
  
  async initialize() {
    this.stripe = await loadStripe(environment.stripe.publicKey);
    const clientSecret = localStorage.getItem('client_secret');

    if(this.stripe && clientSecret) {
      const appearance: Appearance = {
        theme: 'stripe',
      };
      this.elements = this.stripe.elements({appearance, clientSecret});

      const linkAuthenticationElement = this.elements.create("linkAuthentication");
      linkAuthenticationElement.mount("#link-authentication-element");

      linkAuthenticationElement.on('change', (event) => {
        this.emailAddress = event.value.email;
      });

      const paymentElement = this.elements.create('payment', {
        layout: 'tabs'
      });
      paymentElement.mount("#payment-element")
    }
  }

  async handleSubmit() {
    setLoading(true);
    if(this.stripe) {
      const { error } = await this.stripe?.confirmPayment({
        elements: this.elements,
        confirmParams: {
          return_url: "http://localhost:4200/stripe-completion",
          receipt_email: this.emailAddress,
        },
      });
      if(error &&error.type === 'card_error' || error.type === 'validation_error') {
        showMessage(error.message ?? 'Ocurrió un error inesperado');
      } else {
        showMessage("Ocurrió un error inesperado")
      }
    }
  }

  async checkStatus() {
    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );
    if(!clientSecret) {
      return;
    }
    if(this.stripe) {
      const { paymentIntent } = await this.stripe.retrievePaymentIntent(clientSecret);
      
      switch (paymentIntent?.status) {
        case 'succeeded':
          showMessage('Pago realizado con éxito.');
          break;
        case 'processing':
          showMessage('El pago se está procesando.');
          break;
        case 'requires_payment_method':
          showMessage('El pago no se pudo procesar, por favor intente de nuevo.');
          break;
        default:
          showMessage('Ha ocurrido un error.');
          break;
      } 
    }
  }
}

function showMessage(messageText: string) {
  const messageContainer = document.querySelector('#payment-message');
  if(messageContainer) {
    messageContainer.classList.remove('hidden');
    messageContainer.textContent = messageText;
    setTimeout(function() {
      messageContainer.classList.add('hidden');
      messageContainer.textContent = "";
    }, 4000)
  }
}

function setLoading(isLoading: boolean) {
  const submit: HTMLSelectElement | null = document.querySelector("#submit");
  if(submit) {
    if(isLoading) {
      submit.disabled = true;
      document.querySelector("#spinner")?.classList.remove("hidden");
      document.querySelector("#button-text")?.classList.add("hidden");
    }else {
      submit.disabled = false;
      document.querySelector("#spinner")?.classList.add("hidden");
      document.querySelector("#button-text")?.classList.remove("hidden");
    }
  }
}
