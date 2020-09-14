import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @Input() user: User;
  @Output() delete: EventEmitter<any> = new EventEmitter<any>();
  loggedUser = {} as User;

  constructor(private userService: UserService) {
    this.loggedUser = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit(): void {
  }

  onRemoveUser(user) {
    this.delete.emit(user);
  }
}
