import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../../core/auth/services/auth.service';
import {UserService} from '../../../main/users/services/user.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {User} from '../../../main/users/models/user';

@Component({
  selector: 'app-create-user-page',
  templateUrl: './create-user-page.component.html',
  styleUrls: ['./create-user-page.component.scss']
})
export class CreateUserPageComponent implements OnInit {
  createUserForm: FormGroup;
  submitted = false;

  roles = [
    {val: 'user', desc: 'User'},
    {val: 'admin', desc: 'Admin'},
  ];

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private userService: UserService,
              private afs: AngularFirestore) {
    this.createUserForm = this.fb.group({
      displayName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      role: [null, [Validators.required]]
    });
  }

  get displayName() {
    return this.createUserForm.get('displayName');
  }

  get email() {
    return this.createUserForm.get('email');
  }

  get role() {
    return this.createUserForm.get('role');
  }

  ngOnInit() {
  }

  submitForm() {
    this.submitted = true;

    if (this.createUserForm.valid) {
      const loggedUser = this.authService.loggedUser;
      const id = this.afs.createId();
      const user: Partial<User> = {
        uid: id,
        displayName: this.displayName.value,
        email: this.email.value,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: loggedUser.uid,
        role: this.role.value,
        emailVerified: false
      };

      this.userService.createUser(id, user);
      this.router.navigateByUrl('');
    }
  }
}
