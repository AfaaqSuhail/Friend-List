import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../services/user.service';


@Injectable()
export class UserResolver implements Resolve<any> {
  constructor(private userService: UserService, private router: Router) {
  }
  ngOnInit() {
  }
  resolve(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<any> {
    return new Promise((resolve, reject) => {
      if(localStorage.getItem('user'))
        this.router.navigate(['profile'])
        else{
           resolve("done");
        }
    })
  }
}
