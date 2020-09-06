import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {AuthService} from '../../../../shared/auth/services/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.scss']
})
export class UserProfilePageComponent implements OnInit, OnDestroy {
  user: User;
  userSub: Subscription;

  constructor(private authService: AuthService) {
    this.userSub = this.authService.loggedUserFromDbUsers$.subscribe((u) => this.user = u);
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }

}
