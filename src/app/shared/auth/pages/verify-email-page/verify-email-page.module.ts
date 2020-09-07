import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerifyEmailPageComponent } from './verify-email-page.component';
import {RouterModule, Routes} from '@angular/router';
import {PageTitleModule} from '../../../components/page-title/page-title.module';

const routes: Routes = [
  {
    path: '',
    component: VerifyEmailPageComponent
  }
];

@NgModule({
  declarations: [VerifyEmailPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PageTitleModule
  ]
})
export class VerifyEmailPageModule { }
