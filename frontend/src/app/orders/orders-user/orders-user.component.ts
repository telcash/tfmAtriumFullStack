import { Component, OnInit } from '@angular/core';
import { Order } from '../models/order';
import { OrdersService } from '../orders.service';
import { tap } from 'rxjs';
import { GlobalConstants } from 'src/app/config/global-constants';

@Component({
  selector: 'app-orders-user',
  templateUrl: './orders-user.component.html',
  styleUrls: ['./orders-user.component.css']
})
export class OrdersUserComponent implements OnInit {

  orders: Order[] = [];

  constructor(private ordersService: OrdersService) {}



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


}
