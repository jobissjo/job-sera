import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/modules/auth/services/auth.service";

export const canActivateLogin = () => {
    const authService = inject(AuthService);
    const router = inject(Router);
    // without subscribe to get current val from behavior subject
    // console.log(authService.loggedInSub$.getValue());
    
    if (authService.isAuthenticated()) {
        return true;
    } else {
        router.navigate(['auth/sign-in'])
        return false;
    }
}

export const canActivateChildLogin = () => {
    return canActivateLogin()
}