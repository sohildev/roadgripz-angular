import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list.component';
import { RouterModule, Routes } from '@angular/router';
import { PaginationModule } from 'src/app/common-module/pagination/pagination.module';
import { ProductService } from 'src/app/service/product.service';

const routes: Routes = [
  {
    path: '',
    component: ProductListComponent
  },
  {
    path: 'add',
    loadChildren: () => import('../product-add/product-add.module').then(m => m.ProductAddModule),
  },
  {
    path: 'edit/:id',
    loadChildren: () => import('../product-add/product-add.module').then(m => m.ProductAddModule)
  },
  {
    path: 'view/:id',
    loadChildren: () => import('../product-view/product-view.module').then(m => m.ProductViewModule)
  }
];

@NgModule({
  declarations: [ProductListComponent],
  imports: [
    CommonModule,
    PaginationModule,
    RouterModule.forChild(routes)
  ],
  providers: [ProductService]
})
export class ProductListModule { }
