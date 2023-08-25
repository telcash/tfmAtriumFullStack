import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersTableComponent } from './orders-table/orders-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';



@NgModule({
  declarations: [
    OrdersTableComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatToolbarModule,
  ]
})
export class OrdersModule { }
