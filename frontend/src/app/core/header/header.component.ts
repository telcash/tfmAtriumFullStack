import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isUserLogged: boolean = false;
  isUserAdmin: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cookieService: CookieService,
  ) {}

  userLoggedSubscription?: Subscription;

  ngOnInit(): void {
    
    if(this.authService.isUserLogged()) {
      this.isUserLogged = true;
    }
    
    if(this.authService.isUserAdmin()) {
      this.isUserAdmin = true;
    }

    this.userLoggedSubscription = this.authService.getUserLoggedIn().subscribe(
      (data) => {
        this.isUserLogged = true;
        if(data === 'ADMIN') {
          this.isUserAdmin = true;
        }
      }
    )
  }

  logout() {
    this.authService.logout().subscribe(
      () => {
        this.authService.deleteTokens();
        this.cookieService.delete('role');
        this.isUserLogged = false;
        this.isUserAdmin = false;
        this.router.navigate(['/']);
      }
    )
  }

  ngOnDestroy(): void {
    if(this.userLoggedSubscription) {
      this.userLoggedSubscription.unsubscribe();
    }
  }

}
