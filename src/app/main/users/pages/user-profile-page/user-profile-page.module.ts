import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {UserProfilePageComponent} from './user-profile-page.component';
import {AppModule} from '../../../../app.module';
import {UserComponent} from '../../components/user/user.component';
import {UserModule} from '../../components/user/user.module';

const routes: Routes = [
  {path: '', component: UserProfilePageComponent}
];

@NgModule({
  declarations: [UserProfilePageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    UserModule
  ]
})
export class UserProfilePageModule { }
