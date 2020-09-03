import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/dashboard-page/dashboard-page.module').then(m => m.DashboardPageModule)},
  { path: 'create-user', loadChildren: () => import('./pages/create-user-page/create-user-page.module').then(m => m.CreateUserPageModule)},
  { path: 'edit-user/:id', loadChildren: () => import('./pages/edit-user-page/edit-user-page.module').then(m => m.EditUserPageModule)},
  { path: 'list-users/', loadChildren: () => import('./pages/list-users-page/list-users-page.module').then(m => m.ListUsersPageModule)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
