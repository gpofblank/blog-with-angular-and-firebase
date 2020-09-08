import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../shared/guards/auth.guard';


const routes: Routes = [
  {path: '', pathMatch: 'full', loadChildren: () => import('./home-page/home-page.module').then(m => m.HomePageModule)},
  {path: '/main', pathMatch: 'full', loadChildren: () => import('./home-page/home-page.module').then(m => m.HomePageModule)},
  {
    path: 'create-post',
    canActivate: [AuthGuard],
    loadChildren: () => import('./posts/pages/create-post-page/create-post-page.module').then(m => m.CreatePostPageModule)
  },
  {
    path: 'edit-post/:id',
    canActivate: [AuthGuard],
    loadChildren: () => import('./posts/pages/edit-post-page/edit-post-page.module').then(m => m.EditPostPageModule)
  },
  {
    path: 'list-posts/:id',
    canActivate: [AuthGuard],
    loadChildren: () => import('./posts/pages/list-posts-page/list-posts-page.module').then(m => m.ListPostsPageModule)
  },
  {
    path: 'user-profile/:id',
    canActivate: [AuthGuard],
    loadChildren: () => import('./users/pages/user-profile-page/user-profile-page.module').then(m => m.UserProfilePageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
