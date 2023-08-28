import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Appearance, Stripe, StripeElements, loadStripe } from '@stripe/stripe-js';
import { Order } from 'src/app/orders/models/order';
import { OrdersService } from 'src/app/orders/orders.service';
import { environment } from 'src/environments/environment.development';
import { StripeService } from '../stripe.service';
import { tap } from 'rxjs';
import { GlobalConstants } from 'src/app/config/global-constants';


@Component({
  selector: 'app-stripe-checkout',
  templateUrl: './stripe-checkout.component.html',
  styleUrls: ['./stripe-checkout.component.css']
})


export class StripeCheckoutComponent implements OnInit {

  emailAddress = '';
  stripe!: Stripe | null;
  elements!: StripeElements;
  order!: Order;
  onCheckout = false;

  constructor(
    private stripeService: StripeService,
    private router: Router,
    private route: ActivatedRoute,
    private ordersService: OrdersService,
  ) {  
  }


  ngOnInit(): void {
    const orderId = this.route.snapshot.params['id'];
    this.ordersService.getUserOrder(orderId).pipe(
      tap(
        order => {
          order.items?.forEach(item => item.product.image = GlobalConstants.API_STATIC_PRODUCTS_IMG + '/' + item.product.image);
          this.order = order;
        }
      )
    ).subscribe();
  }
  
  async initialize() {
    this.onCheckout = true;
    this.stripeService.getPaymentIntent(this.order.id).subscribe(
      async data => {
        const clientSecret = data.clientSecret;
        
        this.stripe = await loadStripe(environment.stripe.publicKey);
    
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
    )

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
      if(error && error.type === 'card_error' || error.type === 'validation_error') {
        showMessage(error.message ?? 'Ocurrió un error inesperado');
      } else {
        showMessage("Ocurrió un error inesperado")
      }
    }
    setLoading(false);
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
