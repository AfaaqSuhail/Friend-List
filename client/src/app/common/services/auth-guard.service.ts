import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from './user.service';
@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private cookieService: CookieService, private userService: UserService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('user')) {
                return true;
            }
        else {
            this.router.navigate(['']);
        }
    }
}