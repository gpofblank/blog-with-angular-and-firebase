import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [ModalComponent],
  exports: [
    ModalComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class ModalModule { }
