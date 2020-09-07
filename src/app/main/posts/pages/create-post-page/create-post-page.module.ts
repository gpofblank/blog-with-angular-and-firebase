import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatePostPageComponent } from './create-post-page.component';
import {RouterModule, Routes} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {PageTitleModule} from '../../../../shared/components/page-title/page-title.module';

const routes: Routes = [
  {path: '', component: CreatePostPageComponent}
];

@NgModule({
  declarations: [CreatePostPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    PageTitleModule
  ]
})
export class CreatePostPageModule { }
