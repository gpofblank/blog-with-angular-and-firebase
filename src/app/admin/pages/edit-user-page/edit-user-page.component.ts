import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../shared/auth/services/auth.service';
import {UserService} from '../../../main/users/services/user.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {User} from '../../../main/users/models/user';
import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-edit-user-page',
  templateUrl: './edit-user-page.component.html',
  styleUrls: ['./edit-user-page.component.scss']
})
export class EditUserPageComponent implements OnInit {
  editUserForm: FormGroup;
  submitted = false;
  user: User;
  roles = [
    {val: 'user', desc: 'User'},
    {val: 'admin', desc: 'Admin'},
  ];
  loading = true;

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private userService: UserService,
              private afs: AngularFirestore,
              private route: ActivatedRoute,
              private notificationsService: NotificationsService) {

    const id = this.route.snapshot.params.id;

    this.userService.getUserById(id)
      .then((u) => {
        this.user = u.data() as User;
        this.editUserForm = this.fb.group({
          displayName: [this.user.displayName, [Validators.required]],
          email: [this.user.email, [Validators.required, Validators.email]],
          role: [this.user.role, [Validators.required]]
        });
        this.loading = false;
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

  get displayName() {
    return this.editUserForm.get('displayName');
  }

  get email() {
    return this.editUserForm.get('email');
  }

  get role() {
    return this.editUserForm.get('role');
  }

  ngOnInit() {
  }

  submitForm() {
    this.submitted = true;

    if (this.editUserForm.valid) {
      const changes: Partial<User> = {
        displayName: this.displayName.value,
        email: this.email.value,
        updatedAt: new Date().toISOString(),
        role: this.role.value
      };

      this.userService.updateUser(this.user.uid, changes);
      this.router.navigateByUrl('');
    }
  }
}
