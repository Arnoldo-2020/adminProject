import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private userService: UserService,
               private router: Router ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      console.log ('CANACTIVATE');
      
    return this.userService.validateToken()
                .pipe(
                  tap(
                    isAuth => {
                      if(!isAuth){
                        this.router.navigateByUrl('/login');
                      }
                    }
                  )
                )
  }
  
}
