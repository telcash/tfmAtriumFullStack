import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductCardComponent } from './products/product-card/product-card.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { CartComponent } from './carts/cart/cart.component';
import { HomeComponent } from './core/home/home.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { ProductsTableComponent } from './products/products-table/products-table.component';
import { ProductCreateComponent } from './products/product-create/product-create.component';
import { ProductEditComponent } from './products/product-edit/product-edit.component';
import { UsersTableComponent } from './users/users-table/users-table.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'products/:id',
    component: ProductCardComponent,
  },
  {
    path: 'auth/login',
    component: LoginComponent,
  },
  {
    path: 'auth/signup',
    component: SignupComponent,
  },
  {
    path: 'users/myprofile',
    component: UserProfileComponent,
  },
  {
    path: 'mycart',
    component: CartComponent,
  },
  {
    path: 'admin',
    component: AdminHomeComponent,
    children: [
      {
        path: 'products',
        component: ProductsTableComponent,
      },
      {
        path: 'product-create',
        component: ProductCreateComponent,
      },
      {
        path: 'product-edit/:id',
        component: ProductEditComponent,
      },
      {
        path: 'users',
        component: UsersTableComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
