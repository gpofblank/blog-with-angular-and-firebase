import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateUserPageComponent } from './create-user-page.component';
import {RouterModule, Routes} from '@angular/router';
import {CreatePostPageComponent} from '../../../main/posts/pages/create-post-page/create-post-page.component';
import {PageTitleModule} from '../../../shared/components/page-title/page-title.module';
import {ReactiveFormsModule} from '@angular/forms';

const routes: Routes = [
  {path: '', component: CreateUserPageComponent}
];

@NgModule({
  declarations: [CreateUserPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PageTitleModule,
    ReactiveFormsModule
  ]
})
export class CreateUserPageModule { }
