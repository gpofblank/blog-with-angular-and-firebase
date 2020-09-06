import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {UserProfilePageComponent} from './user-profile-page.component';

const routes: Routes = [
  {path: '', component: UserProfilePageComponent}
];

@NgModule({
  declarations: [UserProfilePageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class UserProfilePageModule { }
