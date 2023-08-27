import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StripeCheckoutComponent } from './stripe-checkout/stripe-checkout.component';
import { StripeCompletionComponent } from './stripe-completion/stripe-completion.component';
import { OrdersModule } from '../orders/orders.module';



@NgModule({
  declarations: [
    StripeCheckoutComponent,
    StripeCompletionComponent
  ],
  imports: [
    CommonModule,
    OrdersModule,
  ]
})
export class StripeModule { }
