import { Component, Input } from '@angular/core';
import { Order } from '../models/order';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.css']
})
export class OrderCardComponent {
  
  @Input() order!: Order;
  
}
