import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../../main/users/models/user';
import {UserService} from '../../../main/users/services/user.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-list-users-page',
  templateUrl: './list-users-page.component.html',
  styleUrls: ['./list-users-page.component.scss']
})
export class ListUsersPageComponent implements OnInit, OnDestroy {
  allUsers: User[];
  loading = true;
  getUsersSub: Subscription;

  constructor(private userService: UserService) {
    this.getUsersSub = this.userService.getUsers().subscribe((data) => {
      this.allUsers = data.map(p => {
        this.loading = false;
        return {...p.payload.doc.data()} as User;
      });
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    if (this.getUsersSub) {
      this.getUsersSub.unsubscribe();
    }
  }

}
