import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {AuthService} from '../../../../core/auth/services/auth.service';
import {Subscription} from 'rxjs';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.scss']
})
export class UserProfilePageComponent implements OnInit {
  user: User;

  constructor(private authService: AuthService,
              private userService: UserService) {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit(): void {
  }

  deleteUser(user: User) {
    this.userService.deleteUser(user.uid);
  }
}
