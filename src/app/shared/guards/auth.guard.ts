import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree
} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../auth/services/auth.service';
import {NotificationsService} from 'angular2-notifications';
import {UserService} from '../../main/users/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router,
              private notificationsService: NotificationsService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const url: string = state.url;
    return this.checkUserLogin(next, url);
  }

  checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
    console.log('guard logged in ', this.authService.isLoggedIn);

    if (this.authService.isLoggedIn) {
      const userRole = this.authService.loggedUser.role;

      if (route.data.role && route.data.role.indexOf(userRole) === -1) {
        this.notificationsService
          .warn('You don\'t have a permission to access this page!', '', {
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: true,
            clickToClose: true,
            preventLastDuplicates: true
          });
        return false;
      }

      return true;
    }

    // this.router.navigateByUrl('/');

    this.notificationsService
      .warn('This page requires you to be logged in!', '', {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true,
        preventLastDuplicates: true
      });

    return false;
  }

}
