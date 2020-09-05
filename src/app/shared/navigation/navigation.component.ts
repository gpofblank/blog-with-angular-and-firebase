import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {User} from '../../main/users/models/user';
import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  loggedUser: User;

  constructor(private authService: AuthService, private notificationsService: NotificationsService) {
    if (this.authService.loggedUser) {
      this.authService.user$.subscribe((user) => this.loggedUser = user);
    }
  }

  ngOnInit() {
  }

  logOut() {
    this.authService.SignOut();
    this.notificationsService
      .success('Have a good one!', 'Thanks for visiting Blog Guru', {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true,
        preventLastDuplicates: true
      });
  }
}
