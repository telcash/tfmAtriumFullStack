import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isUserLogged: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  userLoggedSubscription?: Subscription;

  ngOnInit(): void {

    if(this.authService.isUserLogged()) {
      this.isUserLogged = true;
    }

    this.userLoggedSubscription = this.authService.getUserLoggedIn().subscribe(
      () => this.isUserLogged = true
    )
  }

  logout() {
    this.authService.logout().subscribe(
      () => {
        this.authService.deleteTokens();
        this.isUserLogged = false;
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
