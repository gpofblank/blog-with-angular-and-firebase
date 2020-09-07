import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPostsPageComponent } from './list-posts-page.component';
import {RouterModule, Routes} from '@angular/router';
import {PageTitleModule} from '../../../../shared/components/page-title/page-title.module';
import {PostModule} from '../../components/post/post.module';

const routes: Routes = [
  {path: '', component: ListPostsPageComponent}
];

@NgModule({
  declarations: [ListPostsPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PageTitleModule,
    PostModule
  ]
})
export class ListPostsPageModule { }
