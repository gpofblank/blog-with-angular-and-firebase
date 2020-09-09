import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../main/users/models/user';
import {AngularFirestore} from '@angular/fire/firestore';
import {UserService} from '../../../main/users/services/user.service';
import {Router} from '@angular/router';
import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() title: string;
  @Input() content: string;
  @Input() confirmBtnTxt = 'Apply';
  @Input() cancelBtnTxt = 'Cancel';

  @Input() form: boolean;
  @Input() genericForm: FormGroup;
  @Input() dropdownUsers: boolean;

  users = [
    {uid: 'asdad', displayName: 'asdad12213123'}
  ];

  submitted = false;

  constructor(private fb: FormBuilder,
              private afs: AngularFirestore,
              private userService: UserService,
              private router: Router,
              private notificationsService: NotificationsService) {
    if (this.form) {

      if (this.dropdownUsers) {
        this.genericForm = this.fb.group({
          user: [null, [Validators.required]]
        });

        this.userService.getAllUsersOnce().then((u) => {
          // this.users = u.docs;
          console.log(this.users);
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
    }

  }

  get user() {
    return this.genericForm.get('user');
  }

  ngOnInit(): void {
  }

  submitForm() {
    this.submitted = true;

    if (this.genericForm.valid) {
      const id = this.user.value;

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
