import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import {RouterModule, Routes} from '@angular/router';
import {PostModule} from '../posts/components/post/post.module';

const routes: Routes = [
  {path: '', component: HomePageComponent}
];

@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PostModule
  ]
})
export class HomePageModule { }
