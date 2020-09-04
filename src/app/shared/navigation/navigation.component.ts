import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {User} from '../../main/users/models/user';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  loggedUser: User;

  constructor(private authService: AuthService) {
    if (this.authService.loggedUser) {
      this.loggedUser = this.authService.loggedUser;
    } else {
      this.loggedUser = {} as User;
    }
  }

  ngOnInit() {
  }

}
