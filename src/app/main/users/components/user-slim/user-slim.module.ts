import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSlimComponent } from './user-slim.component';
import {RouterModule} from '@angular/router';



@NgModule({
    declarations: [UserSlimComponent],
    exports: [
        UserSlimComponent
    ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class UserSlimModule { }
