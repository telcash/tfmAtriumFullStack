import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../auth.service";
import { inject } from "@angular/core";

export function roleGuard(role: string, redirectRoute: string): CanActivateFn {
    return () => {
        const authService: AuthService = inject(AuthService);
        const router: Router = inject(Router);
        const userHasRole = authService.getUserRole() === role;
        return userHasRole || router.createUrlTree([redirectRoute]);
    }
}