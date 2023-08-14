import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsModule } from '../products/products.module';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';




@NgModule({
  declarations: [
    AdminHomeComponent,
  ],
  imports: [
    CommonModule,
    ProductsModule,
    RouterModule,
    MatMenuModule,
    MatButtonModule,
    MatToolbarModule,
  ],
  exports: [
  ]
})
export class AdminModule { }
