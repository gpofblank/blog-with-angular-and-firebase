import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password-page',
  templateUrl: './forgot-password-page.component.html',
  styleUrls: ['./forgot-password-page.component.scss']
})
export class ForgotPasswordPageComponent implements OnInit {

  pwResetForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.pwResetForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
    });
  }

  get email() {
    return this.pwResetForm.get('email');
  }

  ngOnInit() {
  }

  submitForm() {
    this.submitted = true;

    if (this.pwResetForm.valid) {
      this.authService.ForgotPassword(this.email.value);
    }
  }

}
