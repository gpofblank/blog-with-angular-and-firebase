import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';
import {Subscription} from 'rxjs';
import {AuthService} from '../../../../core/auth/services/auth.service';

@Component({
  selector: 'app-list-users-page',
  templateUrl: './list-users-page.component.html',
  styleUrls: ['./list-users-page.component.scss']
})
export class ListUsersPageComponent implements OnInit, OnDestroy {
  allUsers: User[];
  loading = true;
  getUsersSub: Subscription;
  currentUser: any;

  constructor(private userService: UserService,
              private authService: AuthService) {
    this.getUsersSub = this.userService.getUsers().subscribe((data) => {
      this.allUsers = data.map(p => {
        this.loading = false;
        return {...p.payload.doc.data()} as User;
      });
    });

    this.currentUser = this.authService.loggedUser;
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    if (this.getUsersSub) {
      this.getUsersSub.unsubscribe();
    }
  }

  deleteUser(user: User) {
    this.userService.deleteUser(user.uid);
  }
}
