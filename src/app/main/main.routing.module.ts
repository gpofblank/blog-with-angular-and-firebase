import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [
  {path: '', loadChildren: () => import('./posts/pages/home-page/home-page.module').then(m => m.HomePageModule)},
  {path: 'create-post', loadChildren: () => import('./posts/pages/create-post-page/create-post-page.module').then(m => m.CreatePostPageModule)},
  {path: 'edit-post/:id', loadChildren: () => import('./posts/pages/edit-post-page/edit-post-page.module').then(m => m.EditPostPageModule)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
