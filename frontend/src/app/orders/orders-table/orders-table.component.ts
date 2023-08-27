import { Component } from '@angular/core';
import { Order } from '../models/order';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.css']
})
export class OrdersTableComponent {
  displayedColumns = ['id', 'userId', 'total', 'status', 'addressId', 'createdAt'];
  orders!: Order[];

  constructor(
    private ordersService: OrdersService,
  ) {}

  ngOnInit() {
    this.getOrdersList();
  }

  getOrdersList() {
    this.ordersService.getAllOrders().subscribe(
      orders => this.orders = orders,
    )
  }
}
