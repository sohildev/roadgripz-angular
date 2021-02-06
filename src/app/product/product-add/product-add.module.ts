import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProductAddComponent } from './product-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormValidationModule } from 'src/app/shared/form-validation/form-validation.module';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: ProductAddComponent
  }
];

@NgModule({
  declarations: [ProductAddComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    FormValidationModule,
    SharedModule
  ]
})
export class ProductAddModule { }

