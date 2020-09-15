import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../core/auth/services/auth.service';
import {NotificationsService} from 'angular2-notifications';
import {AngularFireAuth} from '@angular/fire/auth';
import {Subscription} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {User} from '../../main/users/models/user';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {

  loggedUser: User = {} as User;
  loggedUserSub: Subscription;

  constructor(public authService: AuthService,
              private notificationsService: NotificationsService,
              private afAuth: AngularFireAuth,
              private afs: AngularFirestore) {

      this.loggedUserSub = this.authService.loggedUserFromDbUsers$.subscribe((user) => {
        if (user) {
          this.loggedUser = user;
        } else {
          this.loggedUser = {} as User;
        }
      });

  }

  ngOnInit() {

  }

  logOut() {
    this.authService.SignOut();
  }

  ngOnDestroy() {
    if (this.loggedUserSub) {
      this.loggedUserSub.unsubscribe();
    }
  }
}
