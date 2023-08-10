import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from './core/core.module';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { AuthInterceptor } from './auth/auth.interceptor';
import { CookieService } from 'ngx-cookie-service';
import { CartsModule } from './carts/carts.module';
import { UsersModule } from './users/users.module';
import { AdminModule } from './admin/admin.module';

 
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ProductsModule,
    CoreModule,
    AuthModule,
    CartsModule,
    UsersModule,
    AdminModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    CookieService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
