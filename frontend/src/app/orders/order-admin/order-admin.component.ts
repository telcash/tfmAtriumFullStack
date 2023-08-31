import { Component, OnInit } from '@angular/core';
import { Order } from '../models/order';
import { OrdersService } from '../orders.service';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { GlobalConstants } from 'src/app/config/global-constants';
import { ConfirmDialogComponent, confirmDialogOptions } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { OrderStatus } from '../constants/order-status';

/**
 * Componente que gestiona la vista del detalle de una orden para un administrador
 */
@Component({
  selector: 'app-order-admin',
  templateUrl: './order-admin.component.html',
  styleUrls: ['./order-admin.component.css']
})
export class OrderAdminComponent implements OnInit{

  // Orden
  order!: Order;
  cancelEnabled: boolean = false;
  finishEnabled: boolean = false;

  constructor(
    private ordersService: OrdersService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
  ) {}

  /**
   * Inicialización del componente
   */
  ngOnInit(): void {

    //Obtiene el id de la orden del parámetro de la URL
    const orderId = this.route.snapshot.params['id'];

    // Llamada al servicio para petición al API de crear una orden
    this.ordersService.getOrder(orderId).pipe(
      tap(

        // Mapea a la dirección del servidor, cada una de las imágenes de los items de la orden
        order => order.items?.forEach(item => item.product.image = GlobalConstants.API_STATIC_PRODUCTS_IMG + '/' + item.product.image)
      )
    ).subscribe(
      order => {

        // Inicializa el atributo order
        this.order = order,

        // Inicializa los estatus de los botones de la vista según los datos de la orden
        this.cancelEnabled = (this.order.status === OrderStatus.STARTED || this.order.status === OrderStatus.WAITING_PAYMENT);
        this.finishEnabled = this.order.status === OrderStatus.PAID;
      } 
    )
  }

  /**
   * Método que cancela una ordem
   */
  cancelOrder() {

    // LLamada al servicio para petición al API de actualizar el status de la orden a 'CANCELLED'
    this.ordersService.updateOrder(this.order.id, {status: OrderStatus.CANCELLED}).subscribe(
      () => {

        // Actualiza el atributo order
        this.order.status = OrderStatus.CANCELLED,
        
        // Actualiza el estatus del boton de la vista
        this.cancelEnabled = false;
      }
    )
  }

  /**
   * Método que abre un dialogo de confirmación de cancelación de una orden
   */
  openCancelDialog() {

    // Crea el componente que genera el diálogo
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Cancelar orden',
        question: '¿Desea cancelar la orden? Una vez cancelada ya no se podrá proceder con el pago',
      },
      ...confirmDialogOptions,
    })

    // Si el dialogo cierra confirmando la cancelación de la orden, invoca el metodo cancelOrder()
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.cancelOrder();
      }
    })
  }

  /**
   * Método que finaliza una ordem
   */
  finishOrder() {

    // Llamada al servicio para petición al API de actualizar el status de la orden a 'COMPLETED'
    this.ordersService.updateOrder(this.order.id, {status: OrderStatus.COMPLETED}).subscribe(
      () => {

        // Actualiza el atributo order
        this.order.status = OrderStatus.COMPLETED,

        // Actualiza el estatus del boton de la vista
        this.finishEnabled = false;
      }
    )
  }

  /**
   * Método que abre un dialogo de confirmación de finalización de una orden
   */
  openFinishDialog() {

    // Crea el componente que genera el diálogo
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Dar orden por finalizada',
        question: '¿Desea finalizar la orden? La orden fue pagada y entregada al cliente',
      },
      ...confirmDialogOptions,
    })

    // Si el dialogo cierra confirmando la finalización de la orden, invoca el metodo finishOrder()
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.finishOrder();
      }
    })
  }

}
