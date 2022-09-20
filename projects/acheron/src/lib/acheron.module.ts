import { NgModule } from '@angular/core';
import { AcheronComponent } from './acheron.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    AcheronComponent
  ],
  imports: [
    FormsModule,
    CommonModule
  ],
  exports: [
    AcheronComponent
  ]
})
export class AcheronModule { }
