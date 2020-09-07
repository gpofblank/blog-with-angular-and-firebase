import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {UserProfilePageComponent} from './user-profile-page.component';
import {UserModule} from '../../components/user/user.module';
import {PageTitleModule} from '../../../../shared/components/page-title/page-title.module';

const routes: Routes = [
  {path: '', component: UserProfilePageComponent}
];

@NgModule({
  declarations: [UserProfilePageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    UserModule,
    PageTitleModule
  ]
})
export class UserProfilePageModule { }
