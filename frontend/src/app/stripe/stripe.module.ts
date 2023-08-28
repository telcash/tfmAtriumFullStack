import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StripeCheckoutComponent } from './stripe-checkout/stripe-checkout.component';
import { StripeCompletionComponent } from './stripe-completion/stripe-completion.component';
import { OrdersModule } from '../orders/orders.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    StripeCheckoutComponent,
    StripeCompletionComponent
  ],
  imports: [
    CommonModule,
    OrdersModule,
    MatCardModule,
    MatButtonModule,
  ]
})
export class StripeModule { }
