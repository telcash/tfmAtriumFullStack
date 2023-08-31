import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Order } from '../models/order';
import { OrderStatus } from '../constants/order-status';
import { OrdersService } from '../orders.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent, confirmDialogOptions } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';

/**
 * Componente que gestiona la vista de una tarjeta de orden para un usuario
 */
@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.css']
})
export class OrderCardComponent implements OnInit {
  
  // Atributo de entrada con los datos de la orden
  @Input() order!: Order;

  // Valores de salida (eventos emitidos)
  @Output() payment = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();

  // Estatus de los botoenes de la vista
  paymentEnabled: boolean = false;
  cancelEnabled: boolean = false;
  deleteEnabled: boolean = false;
  goToOrdersEnabled: boolean = false;

  constructor(
    private ordersService: OrdersService,
    private dialog: MatDialog,
    private router: Router,
  ) {}

  /**
   * Inicialización del componente
   */
  ngOnInit(): void {

    // Inicializa los estatus de los botones de la lista
    this.paymentEnabled = (this.order.status === OrderStatus.STARTED || this.order.status === OrderStatus.WAITING_PAYMENT) && (this.router.url === '/users/orders' || this.router.url.includes('checkout'));
    this.cancelEnabled = (this.order.status === OrderStatus.STARTED || this.order.status === OrderStatus.WAITING_PAYMENT) && this.router.url === '/users/orders';
    this.deleteEnabled = (this.order.status !== OrderStatus.PAID) && this.router.url === '/users/orders';
    this.goToOrdersEnabled = this.router.url.includes('checkout');
  }

  /**
   * Metodo para procesar el pago de una orden
   */
  payOrder() {
    
    // Actualiza los estatus de los botones de la vista
    this.cancelEnabled = false;
    this.deleteEnabled = false;

    // Envía un evento de pago al componente padre con el id de la orden
    this.payment.emit(this.order.id);
  }

  /**
   * Metodo para cancelar una orden
   */
  cancelOrder() {

    // Llamada al servicio para solicitar al API la actualización del status de la orden a cancelada
    this.ordersService.updateUserOrder(this.order.id, {status: OrderStatus.CANCELLED}).subscribe(
      () => {

        // Actualiza el atributo order
        this.order.status = OrderStatus.CANCELLED;
        
        // Actualiza los status de los botones de la vista
        this.paymentEnabled = false;
        this.cancelEnabled = false;
      }
    )     
  }

  /**
   * Método que abre un diálogo de confirmación para la cancelación de una orden
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

    // Si el diálogo cierra con una confirmación de la cancelación de la orden, invoca al método cancelOrder()
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.cancelOrder();
      }
    })
  }

  /**
   * Método que elimina una orden
   */
  deleteOrder() {

    // LLamada al servicio para solicitud al API de eliminación de la orden
    this.ordersService.deleteUserOrder(this.order.id).subscribe(

      // Emite un evento de eliminación con el id de la orden al componente padre
      () => this.delete.emit(this.order.id)
    )
  }

  /**
   * Método que abre un diálogo de confirmación para la eliminación de una orden
   */
  openDeleteDialog() {

    // Crea el componente que genera el diálogo
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Borrar orden',
        question: '¿Desea borrar la orden? Una vez borrada ya no podrá verla en su listado',
      },
      ...confirmDialogOptions,
    })

    // Si el diálogo cierra con una confirmación de eliminación invoca al método deleteOrder()
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.deleteOrder();
      }
    })
  }

  /**
   * Método que navega al listado de ordenes
   */
  goToOrders() {
    this.router.navigateByUrl('users/orders');
  }

}
