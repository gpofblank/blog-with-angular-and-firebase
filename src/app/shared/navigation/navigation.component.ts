import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {User} from 'firebase';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  loggedUser: User;

  constructor(private authService: AuthService) {
    // if (this.authService.loggedUser) {
    //   this.loggedUser = this.authService.loggedUser;
    // }
  }

  ngOnInit(): void {
  }

}
