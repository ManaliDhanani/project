import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { map } from "rxjs";
import { AuthService } from "../services/auth.service";

// : boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree>
// router: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot

export const canActivate = () => {
    
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