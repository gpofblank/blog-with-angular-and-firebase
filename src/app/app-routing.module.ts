import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', loadChildren: () => import('./main/auth/pages/login-page/login-page.module').then(m => m.LoginPageModule)},
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)},
  { path: 'main', loadChildren: () => import('./main/main.module').then(m => m.MainModule)},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
