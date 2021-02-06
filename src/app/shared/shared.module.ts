import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberDirective, FloatNumberDirective } from './directive/number.directive';

@NgModule({
  declarations: [
    NumberDirective,
    FloatNumberDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NumberDirective,
    FloatNumberDirective
  ]
})
export class SharedModule { }
