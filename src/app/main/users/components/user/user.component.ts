import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @Input() user: User;
  loggedUser = {} as User;

  constructor(private userService: UserService) {
    this.loggedUser = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit(): void {
  }

  onRemoveUser() {
    this.userService.deleteUser(this.user.uid);
  }
}
