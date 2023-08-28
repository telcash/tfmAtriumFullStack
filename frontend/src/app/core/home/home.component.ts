import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy{
  private breakpointObserver = inject(BreakpointObserver);
  isUserLogged: boolean = false;
  isUserAdmin: boolean = false;
  userLoggedSubscription?: Subscription;


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.HandsetPortrait).pipe(
    map(result => result.matches),
    shareReplay()
  );
  

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.isUserLogged = this.authService.isUserLogged();
    this.isUserAdmin = this.authService.getUserRole() === 'ADMIN';

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
        this.isUserLogged = false;
        this.isUserAdmin = false;
        this.router.navigateByUrl('/');
      }
    )
  }

  ngOnDestroy(): void {
    if(this.userLoggedSubscription) {
      this.userLoggedSubscription.unsubscribe();
    }
  }

}
