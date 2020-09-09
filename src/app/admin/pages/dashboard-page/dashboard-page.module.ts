import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardPageComponent } from './dashboard-page.component';
import { RouterModule, Routes} from '@angular/router';
import {PageTitleModule} from '../../../shared/components/page-title/page-title.module';
// import {ModalModule} from '../../../shared/components/modal/modal.module';
import {ReactiveFormsModule} from '@angular/forms';

const routes: Routes = [
  {path: '', component: DashboardPageComponent},
];

@NgModule({
  declarations: [DashboardPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PageTitleModule,
    ReactiveFormsModule
  ]
})
export class DashboardPageModule { }
