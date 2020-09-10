import { Component, OnInit } from '@angular/core';
import {User} from '../../../main/users/models/user';
import {UserService} from '../../../main/users/services/user.service';

@Component({
  selector: 'app-list-users-page',
  templateUrl: './list-users-page.component.html',
  styleUrls: ['./list-users-page.component.scss']
})
export class ListUsersPageComponent implements OnInit {
  allUsers: User[];
  loading = true;

  constructor(private userService: UserService) {
    this.userService.getUsers().subscribe((data) => {
      this.allUsers = data.map(p => {
        this.loading = false;
        return {...p.payload.doc.data()} as User;
      });
    });
  }

  ngOnInit(): void {
  }

}
