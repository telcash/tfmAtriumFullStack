import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Appearance, Stripe, StripeElements, loadStripe } from '@stripe/stripe-js';
import { Order } from 'src/app/orders/models/order';
import { OrdersService } from 'src/app/orders/orders.service';
import { environment } from 'src/environments/environment.development';
import { StripeService } from '../stripe.service';
import { tap } from 'rxjs';
import { GlobalConstants } from 'src/app/config/global-constants';

/**
 * Componente que gestiona el formulario de pago de Stripe
 */
@Component({
  selector: 'app-stripe-checkout',
  templateUrl: './stripe-checkout.component.html',
  styleUrls: ['./stripe-checkout.component.css']
})


export class StripeCheckoutComponent implements OnInit {

  // Atributos
  emailAddress = '';
  stripe!: Stripe | null;
  elements!: StripeElements;
  order!: Order;
  onCheckout = false;

  constructor(
    private stripeService: StripeService,
    private route: ActivatedRoute,
    private ordersService: OrdersService,
  ) { }

  /**
   * Inicialización del componente
   */
  ngOnInit(): void {

    // Obtiene el id de la orden del parámetro del url
    const orderId = this.route.snapshot.params['id'];

    // LLamada al servicio para solicitar al API la orden a pagar
    this.ordersService.getUserOrder(orderId).pipe(
      tap(
        order => {

          // Mapea la dirección de las imágenes de la orden en el API
          order.items?.forEach(item => item.product.image = GlobalConstants.API_STATIC_PRODUCTS_IMG + '/' + item.product.image);

          // Inicializa el atributo order
          this.order = order;
        }
      )
    ).subscribe();
  }
  
  /**
   * Método que se ejecuta al solicitar pago de la orden
   * Genera el formulario de Stripe dinámicamente
   */
  async initialize() {

    // Indica que se está en el proceso de pago
    this.onCheckout = true;

    // LLamada al servicio para solicitud al API de la creación de un nuevo paymentIntent de Stripe
    this.stripeService.getPaymentIntent(this.order.id).subscribe(
      async data => {

        // Extrae el clientSecret de la respuesta
        const clientSecret = data.clientSecret;
        
        // Inicializa el atributo stripe con la publicKey
        this.stripe = await loadStripe(environment.stripe.publicKey);
    
        // Verifica que se inicializó correctamente stripe y que se obtuvo el clientSecret
        if(this.stripe && clientSecret) {

          // Definición del tema (estilo) del formulario de Stripe
          const appearance: Appearance = {
            theme: 'stripe',
          };

          // Inicialización del atributo elements con el tema y la clientSecret
          this.elements = this.stripe.elements({appearance, clientSecret});
    
          // Creacíon del elemento de autenticación de Stripe
          const linkAuthenticationElement = this.elements.create("linkAuthentication");
          linkAuthenticationElement.mount("#link-authentication-element");
    
          // Escucha de eventos en el elemento de autenticación
          linkAuthenticationElement.on('change', (event) => {

            // Actualiza el email con el valor del campo
            this.emailAddress = event.value.email;
          });
    
          // Creación del elemento de pago de Stripe
          const paymentElement = this.elements.create('payment', {
            layout: 'tabs'
          });
          paymentElement.mount("#payment-element")
        }
      }
    )

  }

  /**
   * Método que se ejecuta al hacer click en el botón de pago del formulario de Stripe
   */
  async handleSubmit() {

    // Invoca a la función setLoading indicado que el pago está en carga o proceso
    setLoading(true);

    // Verifica que el atributo stripe esté inicializado
    if(this.stripe) {

      // Llamada al API de Stripe con los datos del pago para su confirmación
      const { error } = await this.stripe?.confirmPayment({
        elements: this.elements,

        // Parámetros de confirmación si el pago es exitoso
        confirmParams: {

          // Dirección a la que se redirecciona en caso de un pago exitoso
          return_url: "http://localhost:4200/stripe-completion",

          // email para el recibo de pago
          receipt_email: this.emailAddress,
        },
      });

      // Si hay un error en el pago se muestra un mensaje con el error
      if(error && error.type === 'card_error' || error.type === 'validation_error') {
        showMessage(error.message ?? 'Ocurrió un error inesperado');
      } else {
        showMessage("Ocurrió un error inesperado")
      }
    }

    // Invoca a la función setLoading indicado que el proceso de pago ha terminado
    setLoading(false);
  }
}

/**
 * Función que muestra los mensajes de error en el formulario
 * @param {string} messageText - Mensaje a mostrar
 */
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

/**
 * Función que activa un spinner de espera y remueve el botón de pago mientras hay un pago en proceso
 * @param isLoading 
 */
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
