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



@NgModule({
  declarations: [
    OrdersTableComponent,
    OrdersUserComponent,
    OrderCardComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
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
