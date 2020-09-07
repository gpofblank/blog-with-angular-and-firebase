import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPasswordPageComponent } from './forgot-password-page.component';
import {RouterModule, Routes} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {PageTitleModule} from '../../../components/page-title/page-title.module';

const routes: Routes = [
  {
    path: '',
    component: ForgotPasswordPageComponent
  }
];

@NgModule({
  declarations: [ForgotPasswordPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    PageTitleModule
  ]
})
export class ForgotPasswordPageModule { }
