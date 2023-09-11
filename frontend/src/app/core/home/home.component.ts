import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';


/**
 * Componente que gestiona la vista principal (Home) de la aplicación
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy{

  // BrakepointObserver que observa el tamaño de pantalla de la aplicación para ajustes de la vista
  private breakpointObserver = inject(BreakpointObserver);
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.HandsetPortrait).pipe(
    map(result => result.matches),
    shareReplay()
  );
  
  // Atributos de control de los estados de usuario para gestionar la vista según usuario
  isUserLogged: boolean = false;
  isUserAdmin: boolean = false;
  userLoggedSubscription!: Subscription;
  userLoggedOutSubscription!: Subscription;
  
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  /**
   * Configuración inicial del componente
   */
  ngOnInit(): void {

    // Verifica si hay un usuario con sesión iniciada
    this.isUserLogged = this.authService.isUserLogged();

    // Verifica si hay un usuario administrador con sesión iniciada
    this.isUserAdmin = this.authService.getUserRole() === 'ADMIN';

    // Se suscribe al Subject userLoggedIn para escuchar los valores que emita
    this.userLoggedSubscription = this.authService.getUserLoggedIn().subscribe(
      data => {

        // Al llegar un valor, un usuario acaba de iniciar sesión
        this.isUserLogged = true;

        // Chequea el valor recibido y verifica si el usuario que acaba de iniciar sesión es un Administrador
        if(data === 'ADMIN') {
          this.isUserAdmin = true;
        }
      }
    )

    // Se suscribe al Subject userLoggedOut para escuchar los valores que emita
    this.userLoggedOutSubscription = this.authService.getUserLoggedOut().subscribe(

      // Al llegar un valor, un usuario acaba de cerrar sesión
      () => this.isUserLogged = false
    )
  }

  /**
   * Método para cerrar sesión un usuario
   */
  logout() {

    // Llamada al servicio para solicitud al API de cierre de sesión
    this.authService.logout().subscribe(
      () => {

        // Elimina los tokens de acceso y de refrescamiento de LocalStorage
        this.authService.deleteTokens();

        // Modifica los atributos de control de los estados de usuario para gestionar la vista según usuario
        this.isUserLogged = false;
        this.isUserAdmin = false;

        // Navega a la página principal, si está en la página principal la recarga.
        if(this.router.url === '/') {
          window.location.reload();
        } else {
          this.router.navigateByUrl('/');
        }
      }
    )
  }

  /**
   * Instrucciones al destruirse el componente
   */
  ngOnDestroy(): void {

    // Finaliza la suscripción si existe
    if(this.userLoggedSubscription) {
      this.userLoggedSubscription.unsubscribe();
    }
  }

}
