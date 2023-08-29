import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ProductsModule } from '../products/products.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from '../app-routing.module';
import { FooterComponent } from './footer/footer.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { LegalWarningComponent } from './legal-warning/legal-warning.component';

@NgModule({
  declarations: [
    HomeComponent,
    FooterComponent,
    PrivacyPolicyComponent,
    LegalWarningComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ProductsModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
  ],
  exports: [
    HomeComponent,
    FooterComponent,
  ]
})
export class CoreModule { }
