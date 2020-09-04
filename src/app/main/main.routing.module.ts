import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [
  {path: '', pathMatch: 'full', loadChildren: () => import('./home-page/home-page.module').then(m => m.HomePageModule)},
  {path: 'auth/login', loadChildren: () => import('../shared/auth/pages/login-page/login-page.module').then(m => m.LoginPageModule)},
  {path: 'auth/register', loadChildren: () => import('../shared/auth/pages/register-page/register-page.module').then(m => m.RegisterPageModule)},
  {path: 'auth/forgot-password', loadChildren: () => import('../shared/auth/pages/forgot-password-page/forgot-password-page.module').then(m => m.ForgotPasswordPageModule)},
  {path: 'auth/verify-email', loadChildren: () => import('../shared/auth/pages/verify-email-page/verify-email-page.module').then(m => m.VerifyEmailPageModule)},
  {path: 'create-post', loadChildren: () => import('./posts/pages/create-post-page/create-post-page.module').then(m => m.CreatePostPageModule)},
  {path: 'edit-post/:id', loadChildren: () => import('./posts/pages/edit-post-page/edit-post-page.module').then(m => m.EditPostPageModule)},
  {path: 'user-profile/:id', loadChildren: () => import('./users/pages/user-profile-page/user-profile-page.module').then(m => m.UserProfilePageModule)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
