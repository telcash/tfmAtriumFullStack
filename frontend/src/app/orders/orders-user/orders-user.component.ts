import { Component, OnInit } from '@angular/core';
import { Order } from '../models/order';
import { OrdersService } from '../orders.service';
import { tap } from 'rxjs';
import { GlobalConstants } from 'src/app/config/global-constants';
import { Router } from '@angular/router';
import { OrderStatus } from '../constants/order-status';

@Component({
  selector: 'app-orders-user',
  templateUrl: './orders-user.component.html',
  styleUrls: ['./orders-user.component.css']
})
export class OrdersUserComponent implements OnInit {

  orders: Order[] = [];

  constructor(
    private ordersService: OrdersService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.ordersService.getAllUserOrders().pipe(
      tap(
        orders => {
          orders.forEach(order => order.items!.forEach(item => item.product.image = GlobalConstants.API_STATIC_PRODUCTS_IMG + '/' + item.product.image));
        }
      )
    ).subscribe(
      orders => this.orders = orders
    )
  }

  payment(orderId: number) {
    this.router.navigateByUrl(`checkout/${orderId}`)
  }
  
}
