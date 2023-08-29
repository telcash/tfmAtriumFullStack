import { Component, OnInit } from '@angular/core';
import { Order } from '../models/order';
import { OrdersService } from '../orders.service';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { GlobalConstants } from 'src/app/config/global-constants';
import { ConfirmDialogComponent, confirmDialogOptions } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { OrderStatus } from '../constants/order-status';

@Component({
  selector: 'app-order-admin',
  templateUrl: './order-admin.component.html',
  styleUrls: ['./order-admin.component.css']
})
export class OrderAdminComponent implements OnInit{

  order!: Order;
  cancelEnabled: boolean = false;
  finishEnabled: boolean = false;

  constructor(
    private ordersService: OrdersService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    const orderId = this.route.snapshot.params['id'];
    this.ordersService.getOrder(orderId).pipe(
      tap(
        order => order.items?.forEach(item => item.product.image = GlobalConstants.API_STATIC_PRODUCTS_IMG + '/' + item.product.image)
      )
    ).subscribe(
      order => {
        this.order = order,
        this.cancelEnabled = (this.order.status === OrderStatus.STARTED || this.order.status === OrderStatus.WAITING_PAYMENT);
        this.finishEnabled = this.order.status === OrderStatus.PAID;
      } 
    )
  }

  cancelOrder() {
    this.ordersService.updateOrder(this.order.id, {status: OrderStatus.CANCELLED}).subscribe(
      () => {
        this.order.status = OrderStatus.CANCELLED,
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

  finishOrder() {
    this.ordersService.updateOrder(this.order.id, {status: OrderStatus.COMPLETED}).subscribe(
      () => {
        this.order.status = OrderStatus.COMPLETED,
        this.finishEnabled = false;
      }
    )
  }

  openFinishDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Dar orden por finalizada',
        question: '¿Desea finalizar la orden? La orden fue pagada y entregada al cliente',
      },
      ...confirmDialogOptions,
    })

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.finishOrder();
      }
    })
  }

}
