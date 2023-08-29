import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../auth.service";
import { inject } from "@angular/core";

/**
 * Guard que gestiona el acceso a rutas de navegación según el rol del usuario
 * @param {string} role - Rol que debe tener el usuario para tener acceso a la ruta
 * @param {string} redirectRoute - Ruta de redirección en caso de negarse el acceso
 * @returns {CanActivateFn} - Función de validación
 */
export function roleGuard(role: string, redirectRoute: string): CanActivateFn {
    return () => {

        const authService: AuthService = inject(AuthService);
        const router: Router = inject(Router);

        // Obtenemos el rol del usuario que hace la petición y lo comparamos con el rol exigido
        const userHasRole = authService.getUserRole() === role;

        // Retorna true si el usuario tiene un rol válido o los datos para navegar a la página de redirección
        return userHasRole || router.createUrlTree([redirectRoute]);
    }
}