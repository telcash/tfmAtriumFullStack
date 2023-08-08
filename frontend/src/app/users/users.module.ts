import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from './users.service';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UserUpdateComponent } from './user-update/user-update.component';
import { AuthModule } from '../auth/auth.module';



@NgModule({
  declarations: [
    UserProfileComponent,
    UserUpdateComponent
  ],
  imports: [
    CommonModule,
    AuthModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    UsersService,
  ]
})
export class UsersModule { }
