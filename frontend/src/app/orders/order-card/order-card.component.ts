import { Component, Input, OnInit } from '@angular/core';
import { Order } from '../models/order';
import { OrderStatus } from '../constants/order-status';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.css']
})
export class OrderCardComponent implements OnInit {
  
  @Input() order!: Order;
  paymentEnabled: boolean = false;
  cancelEnabled: boolean = false;
  deleteEnabled: boolean = false;

  ngOnInit(): void {
    this.paymentEnabled = this.order.status === OrderStatus.STARTED;
    this.cancelEnabled = this.order.status === OrderStatus.STARTED;
    this.deleteEnabled = this.order.status !== OrderStatus.PAID;
  }

  payOrder() {
    console.log('pay order')
  }

  cancelOrder() {
    console.log('c')
  }

  deleteOrder() {
    
  }

}
