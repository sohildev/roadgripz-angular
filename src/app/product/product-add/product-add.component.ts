import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';
import { Location } from '@angular/common';
declare var swal: any;

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
})
export class ProductAddComponent implements OnInit {

  loadingState = false;
  addForm: FormGroup;
  selectedFile: File;
  editImageUrl: any = null;
  showLoader = false;
  formErrors = {
    name: null,
    apierror: null
  };
  isEditing = false;
  editId = null;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private location:Location,
    private productService: ProductService
  ) {
    if (this.activatedRoute.snapshot.paramMap.get('id')) {
      this.isEditing = true;
      this.editId = this.activatedRoute.snapshot.paramMap.get('id');
      this.editObject();
    }
    this.addForm = fb.group({
      name: [null, Validators.compose([Validators.required])],
      price: [null, Validators.compose([Validators.required])],
    });
  }

  ngOnInit() {
  }

  editObject() {
    this.loadingState=true;
    this.productService.getProductById(this.editId).subscribe((response) => {
      this.loadingState=false;
      if (response.data) {
        this.editImageUrl = response.data.image,
        this.addForm.patchValue({
          name: response.data.name,
          price: response.data.price,
        });
      }
    }, (error) => {
      this.loadingState=false;
      // this.router.navigateByUrl('/product');
      this.back();
    });
  }

  fileChangeEvent(fileInput: any) {
    const reg = /(.*?)\.(jpg|jpeg|png|gif|giff)$/;
    if (!fileInput.target.files[0].name.match(reg)) {
      swal.fire(
        'Invalid File!',
        'Please select valid file ',
        'error'
      );
      this.removeFile();
      return false;
    } else {
      this.removeFile();
      this.selectedFile = fileInput.target.files[0];
    }
  }

  removeFile() {
    this.selectedFile = null;
  }

  submitForm(formdata): void {
    if (this.addForm.valid) {
      this.showLoader = true;
      const formData = new FormData();
      formData.append('name', formdata.value.name);
      formData.append('price', formdata.value.price);
      if (this.selectedFile) {
        formData.append('file', this.selectedFile);
      }
      if (this.isEditing) {
        this.productService.editProduct(this.editId, formData).subscribe((response) => {
          this.showLoader = false;
          if (response.success) {
            // this.router.navigateByUrl('/product');
            this.back();
          } else {
            this.showLoader = false;
            response.error.map(obj => {
              if (obj.hasOwnProperty('name')) {
                this.formErrors.name = obj.name;
              }
            });
          }
        });
      } else {
        this.productService.addProduct(formData).subscribe((response) => {
          this.showLoader = false;
          if (response.success) {
            // this.router.navigateByUrl('/product');
            this.back();
          } else {
            this.showLoader = false;
            response.error.map(obj => {
              if (obj.hasOwnProperty('name')) {
                this.formErrors.name = obj.name;
              }
            });
          }
        });
      }
    }
  }

  back(){
    this.location.back();
  }
}
