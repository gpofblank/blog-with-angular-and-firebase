import {Component, OnInit} from '@angular/core';
import {animate, group, state, style, transition, trigger} from '@angular/animations';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AngularFirestore} from '@angular/fire/firestore';
import {UserService} from '../../../main/users/services/user.service';
import {Router} from '@angular/router';
import {NotificationsService} from 'angular2-notifications';
import {User} from '../../../main/users/models/user';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
  animations: [
    trigger('DivInOut', [
      state('in', style({height: '*', opacity: 0})),
      transition(':leave', [
        style({height: '*', opacity: 1}),

        group([
          animate(200, style({height: 0})),
          animate('200ms ease-in-out', style({'opacity': '0'}))
        ])

      ]),
      transition(':enter', [
        style({height: '0', opacity: 0}),

        group([
          animate(200, style({height: '*'})),
          animate('200ms ease-in-out', style({'opacity': '1'}))
        ])

      ])
    ])
  ]
})
export class DashboardPageComponent implements OnInit {
  showLAUBody: boolean;
  showCUBody: boolean;
  showUUBody: boolean;
  showSAPBody: boolean;
  selectUserForm: FormGroup;

  // users = [
  //   {uid: 'asdad', displayName: 'asdad12213123'}
  // ];

  users: User[];
  submitted = false;

  constructor(private fb: FormBuilder,
              private afs: AngularFirestore,
              private userService: UserService,
              private router: Router,
              private notificationsService: NotificationsService) {
    this.showLAUBody = false;
    this.showCUBody = false;
    this.showUUBody = false;
    this.showSAPBody = false;

    this.selectUserForm = this.fb.group({
      user: [null, [Validators.required]]
    });

    this.userService.getAllUsersOnce().then((data) => {
      this.users = data.docs.map(user => user.data() as User);
    }).catch((error) => {
      this.notificationsService
        .error('Error upon getting users', error.message, {
          timeOut: 3000,
          showProgressBar: true,
          pauseOnHover: true,
          clickToClose: true,
          preventLastDuplicates: true
        });
    });
  }

  get user() {
    return this.selectUserForm.get('user');
  }

  ngOnInit(): void {
  }

  submitForm() {
    this.submitted = true;

    if (this.selectUserForm.valid) {
      const id = this.user.value;
      document.getElementById('closeSelectUserModal').click();

      this.userService.getUserById(id).then((u) => {
        const user = u.data() as User;
        this.router.navigateByUrl('/admin/edit-user/' + user.uid);
      }).catch((error) => {
        this.notificationsService
          .error('Error upon getting a user', error.message, {
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: true,
            clickToClose: true,
            preventLastDuplicates: true
          });
      });
    }
  }
}
