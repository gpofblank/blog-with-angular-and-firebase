import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditPostPageComponent } from './edit-post-page.component';
import {RouterModule, Routes} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';

const routes: Routes = [
  {path: '', component: EditPostPageComponent}
];

@NgModule({
  declarations: [EditPostPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ]
})
export class EditPostPageModule { }
