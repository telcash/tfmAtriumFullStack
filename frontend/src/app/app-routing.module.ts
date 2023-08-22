import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductCardComponent } from './products/product-card/product-card.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { CartComponent } from './carts/cart/cart.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { ProductsTableComponent } from './products/products-table/products-table.component';
import { ProductCreateComponent } from './products/product-create/product-create.component';
import { ProductEditComponent } from './products/product-edit/product-edit.component';
import { UsersTableComponent } from './users/users-table/users-table.component';
import { AddressCreateComponent } from './addresses/address-create/address-create.component';
import { AddressGalleryComponent } from './addresses/address-gallery/address-gallery.component';
import { AddressEditComponent } from './addresses/address-edit/address-edit.component';
import { CategoriesTableComponent } from './categories/categories-table/categories-table.component';
import { CategoryCreateComponent } from './categories/category-create/category-create.component';
import { ProductGalleryComponent } from './products/product-gallery/product-gallery.component';
import { CategoryEditComponent } from './categories/category-edit/category-edit.component';
import { roleGuard } from './auth/guards/role-guard';
import { StripeCheckoutComponent } from './stripe/stripe-checkout/stripe-checkout.component';
import { StripeCompletionComponent } from './stripe/stripe-completion/stripe-completion.component';

const routes: Routes = [
  {
    path: '',
    component: ProductGalleryComponent,
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
    path: 'users/myprofile/addresses',
    component: AddressGalleryComponent,
  },
  {
    path: 'users/myprofile/addresses/add-address',
    component: AddressCreateComponent,
  },
  {
    path: 'users/myprofile/addresses/edit-address/:id',
    component: AddressEditComponent,
  },
  {
    path: 'mycart',
    component: CartComponent,
  },
  {
    path: 'stripe-checkout',
    component: StripeCheckoutComponent,
  },
  {
    path: 'stripe-completion',
    component: StripeCompletionComponent,
  },
  {
    path: 'admin',
    component: AdminHomeComponent,
    canActivate: [roleGuard('ADMIN', '/')],
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
      },
      {
        path: 'categories',
        component: CategoriesTableComponent,
      },
      {
        path: 'category-create',
        component: CategoryCreateComponent,
      },
      {
        path: 'category-edit/:id',
        component: CategoryEditComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    scrollOffset: [0,58],
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
