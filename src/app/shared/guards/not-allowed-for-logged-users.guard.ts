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
import {defaultAlertSettings} from '../alert.settings';

@Injectable({
  providedIn: 'root'
})
export class NotAllowedForLoggedUsersGuard implements CanActivate {

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

    if (!this.authService.isLoggedIn) {
      return true;
    }

    // this.router.navigateByUrl('/');

    this.notificationsService
      .warn('This page is not available for logged in users!', '', defaultAlertSettings);

    return false;
  }

}
