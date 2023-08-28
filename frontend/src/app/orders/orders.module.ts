import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersTableComponent } from './orders-table/orders-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { OrdersUserComponent } from './orders-user/orders-user.component';
import { OrderCardComponent } from './order-card/order-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { OrdersService } from './orders.service';
import { MatDividerModule } from '@angular/material/divider';
import { AppRoutingModule } from '../app-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { OrderComponent } from './order/order.component';



@NgModule({
  declarations: [
    OrdersTableComponent,
    OrdersUserComponent,
    OrderCardComponent,
    OrderComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    AppRoutingModule,
  ],
  exports: [
    OrderCardComponent,
  ],
  providers: [
    OrdersService,
  ]
})
export class OrdersModule { }
