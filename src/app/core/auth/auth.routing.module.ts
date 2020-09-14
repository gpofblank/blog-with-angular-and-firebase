import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../../shared/guards/auth.guard';
import {NotAllowedForLoggedUsersGuard} from '../../shared/guards/not-allowed-for-logged-users.guard';

const routes: Routes = [
  {path: '', pathMatch: 'full', loadChildren: () => import('./pages/login-page/login-page.module').then(m => m.LoginPageModule)},
  {
    path: 'login',
    canActivate: [NotAllowedForLoggedUsersGuard],
    loadChildren: () => import('./pages/login-page/login-page.module').then(m => m.LoginPageModule)},
  {
    path: 'register',
    canActivate: [NotAllowedForLoggedUsersGuard],
    loadChildren: () => import('./pages/register-page/register-page.module').then(m => m.RegisterPageModule)},
  {
    path: 'forgot-password',
    loadChildren: () => import('./pages/forgot-password-page/forgot-password-page.module').then(m => m.ForgotPasswordPageModule)
  },
  {
    path: 'verify-email',
    loadChildren: () => import('./pages/verify-email-page/verify-email-page.module').then(m => m.VerifyEmailPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
