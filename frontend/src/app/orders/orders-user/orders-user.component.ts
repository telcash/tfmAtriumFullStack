import { Component, OnInit } from '@angular/core';
import { Order } from '../models/order';
import { OrdersService } from '../orders.service';
import { tap } from 'rxjs';
import { GlobalConstants } from 'src/app/config/global-constants';
import { Router } from '@angular/router';

/**
 * Componente que gestiona la vista con el listado de ordenes de un usuario
 */
@Component({
  selector: 'app-orders-user',
  templateUrl: './orders-user.component.html',
  styleUrls: ['./orders-user.component.css']
})
export class OrdersUserComponent implements OnInit {

  // Listado de ordenes
  orders: Order[] = [];

  constructor(
    private ordersService: OrdersService,
    private router: Router,
  ) {}

  /**
   * Inicialización del componente
   */
  ngOnInit(): void {

    // LLamada al servicio para solicitud al API del listado de todas las ordenes del usuario
    this.ordersService.getAllUserOrders().pipe(
      tap(

        // Mapea la imagen de cada item de cada orden con la dirección en el API
        orders => {
          orders.forEach(order => order.items!.forEach(item => item.product.image = GlobalConstants.API_STATIC_PRODUCTS_IMG + '/' + item.product.image));
        }
      )
    ).subscribe(

      // Inicializa el listado de ordenes
      orders => this.orders = orders
    )
  }

  /**
   * Método que procesa el pago de una orden
   * @param {number} orderId - Id de la orden a pagar
   */
  payment(orderId: number) {

    // Navega a la página de pago de Stripe
    this.router.navigateByUrl(`checkout/${orderId}`)
  }

  /**
   * Método que elimina una orden del atributo orders
   * @param {number} orderId - Id de la orden, recibido en el evento delete
   */
  delete(orderId: number) {
    this.orders.splice(this.orders.findIndex(order => order.id === orderId), 1);
  }
  
}
