import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatePostPageComponent } from './create-post-page.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '', component: CreatePostPageComponent}
];

@NgModule({
  declarations: [CreatePostPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class CreatePostPageModule { }
