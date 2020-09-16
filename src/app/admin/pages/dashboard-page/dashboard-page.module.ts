import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardPageComponent } from './dashboard-page.component';
import { RouterModule, Routes} from '@angular/router';
import {PageTitleModule} from '../../../shared/components/page-title/page-title.module';
// import {ModalModule} from '../../../shared/components/modal/modal.module';
import {ReactiveFormsModule} from '@angular/forms';
import {UserModule} from '../../../main/users/components/user/user.module';
import {PostModule} from '../../../main/posts/components/post/post.module';
import {PostSlimModule} from '../../../main/posts/components/post-slim/post-slim.module';
import {UserSlimModule} from '../../../main/users/components/user-slim/user-slim.module';

const routes: Routes = [
  {path: '', component: DashboardPageComponent},
];

@NgModule({
  declarations: [DashboardPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PageTitleModule,
    ReactiveFormsModule,
    UserModule,
    PostModule,
    PostSlimModule,
    UserSlimModule
  ]
})
export class DashboardPageModule { }
