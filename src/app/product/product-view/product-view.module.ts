import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductViewComponent } from './product-view.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ProductViewComponent
  }
];
@NgModule({
  declarations: [ProductViewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class ProductViewModule { }
