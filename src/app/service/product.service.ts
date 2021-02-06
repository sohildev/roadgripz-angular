import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable()
export class ProductService {

  API_URL: string = environment.APIEndpoint;

  constructor(
    private http: HttpClient,
  ) { }

  getProductList(param): Observable<any> {
    return this.http.get(`${this.API_URL}/product`, { params: param });
  }

  addProduct(data): Observable<any> {
    return this.http.post(`${this.API_URL}/product`, data);
  }

  editProduct(id, data): Observable<any> {
    return this.http.put(`${this.API_URL}/product/${id}`, data);
  }

  deleteProduct(id): Observable<any> {
    return this.http.delete(`${this.API_URL}/product/${id}`);
  }

  getProductById(id, param = null): Observable<any> {
    return this.http.get(`${this.API_URL}/product/${id}`, { params: param });
  }

}
