declare var swal: any;
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { errorMessage } from 'src/app/messages';
import { PaginationService } from 'src/app/service/pagination.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html'
})

export class ProductListComponent implements OnInit {

  loadingState = true;
  objectArray: Array<any> = [];
  pagination: any = null;
  searchText: any = null;
  currentPage: any = 1;

  constructor(
    private router: Router,
    private productService: ProductService,
    private paginationService: PaginationService
  ) {
  }

  ngOnInit() {
    this.getObjects();
  }

  getObjects() {
    this.loadingState = true;
    const params: any = { page: this.currentPage };
    if (this.searchText) {
      params.search = this.searchText;
    }

    this.productService.getProductList(params).subscribe((response) => {
      this.loadingState = false;
      if (response.success) {
        this.objectArray = response.data.data;
        this.pagination = this.paginationService.getPager(response.data.pagination['total_page'], this.currentPage);
      } else {
        this.objectArray = [];
        this.pagination = null;
      }
    }, (error) => {
      this.loadingState = false;
      this.objectArray = [];
      this.pagination = null;
      // console.log(error);
    });
  }

  getPage(page: number) {
    this.currentPage = page;
    this.getObjects();
  }

  searchObject(text) {
    this.searchText = text;
    this.currentPage=1;
    this.getObjects();
  }

  deleteObject(object) {
    swal.fire({
      title: errorMessage.delete_header_text,
      text: errorMessage.delete_smalll_text,
      icon: errorMessage.delete_dialogue_type,
      showCancelButton: true,
      confirmButtonText: errorMessage.delete_confirm_button,
      cancelButtonText: errorMessage.delete_cancel_button,
    }).then((result) => {
      if (result.value) {
        this.productService.deleteProduct(object.id).subscribe(
          (response) => {
            if (response.success) {
              this.getObjects();
            }
          },
        );
      }
    }).catch(swal.noop);
  }
}

