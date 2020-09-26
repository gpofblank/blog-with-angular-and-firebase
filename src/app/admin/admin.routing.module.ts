import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./pages/dashboard-page/dashboard-page.module').then(m => m.DashboardPageModule)
  },
  {
    path: 'create-user',
    loadChildren: () => import('./pages/create-user-page/create-user-page.module').then(m => m.CreateUserPageModule)
  },
  {
    path: 'edit-user/:id',
    loadChildren: () => import('./pages/edit-user-page/edit-user-page.module').then(m => m.EditUserPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
