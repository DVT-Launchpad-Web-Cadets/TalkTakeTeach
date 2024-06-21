import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import ProductInterface from '../interfaces/products';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProducts(searchValue: string): Observable<ProductInterface[]> {
    return this.http.get(`../interfaces/products.json`) as Observable<
      ProductInterface[]
    >;
    // return EMPTY;
    //this is where the call to backend for products will be
  }
}
