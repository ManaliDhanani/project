import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, map } from "rxjs";
import { AuthService } from "../services/auth.service";

export const canActivate = (
    router: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
): boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> => {
    
    const authService = inject(AuthService);
    const route = inject(Router);

    return authService.user.pipe(map((user) => {
        const loggedIn = user ? true : false;
        if(loggedIn){
            return true;
        }else{
            return route.createUrlTree(['/login']);
        }
    }))
};