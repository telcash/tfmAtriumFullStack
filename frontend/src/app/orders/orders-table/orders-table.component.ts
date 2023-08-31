import { Component } from '@angular/core';
import { Order } from '../models/order';
import { OrdersService } from '../orders.service';

/**
 * Componente que gestiona la tabla con el listado de todas las ordenes
 */
@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.css']
})
export class OrdersTableComponent {

  // Columnas de la tabla en la vista
  displayedColumns = ['id', 'user', 'email', 'mobile', 'total', 'status', 'createdAt', 'view'];
  
  // Listado de órdenes
  orders!: Order[];

  constructor(
    private ordersService: OrdersService,
  ) {}

  //Inicialización del componente
  ngOnInit() {

    // LLamada al servicio para solicitud al API del listado de todas las órdenes
    this.ordersService.getAllOrders().subscribe(

      // Inicializa el listado de órdenes
      orders => this.orders = orders,
    )
  }

}
