import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostSlimComponent } from './post-slim.component';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [PostSlimComponent],
  exports: [
    PostSlimComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class PostSlimModule { }
