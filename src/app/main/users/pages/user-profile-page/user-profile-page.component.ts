import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {AngularFireAuth} from '@angular/fire/auth';
import {AuthService} from '../../../../shared/services/auth.service';

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.scss']
})
export class UserProfilePageComponent implements OnInit {
  user: User;

  constructor(private authService: AuthService) {
    this.user = this.authService.loggedUser || {} as User;
  }

  ngOnInit(): void {
  }

}
