import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isUserLogged: boolean = false;

  constructor(private authService: AuthService) {}

  userLoggedSubscription?: Subscription;

  ngOnInit(): void {

    if(this.authService.isUserLogged()) {
      this.isUserLogged = true;
    }

    this.userLoggedSubscription = this.authService.getUserLoggedIn().subscribe(
      () => {
        this.isUserLogged = true
      } 
    )
  }

  logout() {
    this.authService.logout().subscribe(
      () => {
        this.authService.deleteTokens();
        this.isUserLogged = false;
      }
    )
  }

  ngOnDestroy(): void {
    if(this.userLoggedSubscription) {
      this.userLoggedSubscription.unsubscribe();
    }
  }

}
