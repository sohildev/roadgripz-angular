  import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { ActivatedRoute, Router } from '@angular/router';

  @Component({
    selector: 'app-product-view',
    templateUrl: './product-view.component.html',
  })
  export class ProductViewComponent implements OnInit {

    objectDetails: any;
    PageTitle="Product Details"
    viewId: any;
    constructor(
      private productService:ProductService,
      private activatedRoute: ActivatedRoute,
      private router: Router,
    ) {
      if (this.activatedRoute.snapshot.paramMap.get('id')) {
        this.viewId = this.activatedRoute.snapshot.paramMap.get('id');
      }
     }
  
    ngOnInit(): void {
      this.productService.getProductById(this.viewId).subscribe((responce)=>{
        if(responce){      
          this.objectDetails=responce.data;
        }
      });
    }
  
  }
  