import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Order } from '../models/order';
import { OrderStatus } from '../constants/order-status';
import { OrdersService } from '../orders.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent, confirmDialogOptions } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.css']
})
export class OrderCardComponent implements OnInit {
  
  @Input() order!: Order;
  @Output() payment = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();
  paymentEnabled: boolean = false;
  cancelEnabled: boolean = false;
  deleteEnabled: boolean = false;
  goToOrdersEnabled: boolean = false;

  constructor(
    private ordersService: OrdersService,
    private dialog: MatDialog,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.paymentEnabled = (this.order.status === OrderStatus.STARTED || this.order.status === OrderStatus.WAITING_PAYMENT) && (this.router.url === '/users/orders' || this.router.url.includes('checkout'));
    this.cancelEnabled = (this.order.status === OrderStatus.STARTED || this.order.status === OrderStatus.WAITING_PAYMENT) && this.router.url === '/users/orders';
    this.deleteEnabled = (this.order.status !== OrderStatus.PAID) && this.router.url === '/users/orders';
    this.goToOrdersEnabled = this.router.url.includes('checkout');
  }

  payOrder() {
    this.cancelEnabled = false;
    this.deleteEnabled = false;
    this.payment.emit(this.order.id);
  }

  cancelOrder() {
    this.ordersService.updateUserOrder(this.order.id, {status: OrderStatus.CANCELLED}).subscribe(
      () => {
        this.order.status = OrderStatus.CANCELLED;
        this.paymentEnabled = false;
        this.cancelEnabled = false;
      }
    )     
  }

  openCancelDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Cancelar orden',
        question: '¿Desea cancelar la orden? Una vez cancelada ya no se podrá proceder con el pago',
      },
      ...confirmDialogOptions,
    })

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.cancelOrder();
      }
    })
  }

  deleteOrder() {
    this.ordersService.deleteUserOrder(this.order.id).subscribe(
      () => this.delete.emit(this.order.id)
    )
  }

  openDeleteDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Borrar orden',
        question: '¿Desea borrar la orden? Una vez borrada ya no podrá verla en su listado',
      },
      ...confirmDialogOptions,
    })

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.deleteOrder();
      }
    })
  }

  goToOrders() {
    this.router.navigateByUrl('users/orders');
  }

}
