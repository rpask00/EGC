import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {LoginService} from '../SERVICES/login.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoutesGuard implements CanActivate {

  constructor(
    private loginSv: LoginService,
    private router: Router
  ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.loginSv.islogged.pipe(map(usr => {
      if (usr) return true
      this.router.navigate(['login'])
      return false
    }))
  }

}
