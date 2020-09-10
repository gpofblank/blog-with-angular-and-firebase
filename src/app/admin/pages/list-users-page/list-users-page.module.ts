import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListUsersPageComponent } from './list-users-page.component';
import {RouterModule, Routes} from '@angular/router';
import {CreatePostPageComponent} from '../../../main/posts/pages/create-post-page/create-post-page.component';
import {PageTitleModule} from '../../../shared/components/page-title/page-title.module';
import {UserModule} from '../../../main/users/components/user/user.module';

const routes: Routes = [
  {path: '', component: ListUsersPageComponent}
];

@NgModule({
  declarations: [ListUsersPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PageTitleModule,
    UserModule
  ]
})
export class ListUsersPageModule { }
