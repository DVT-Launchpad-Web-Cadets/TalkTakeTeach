import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import ProductInterface from '../interfaces/products';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private baseUrl = 'assets/products.json';

  constructor(private http: HttpClient) {}

  getProducts(searchValue: string): Observable<ProductInterface[]> {
    return this.http.get<ProductInterface[]>(this.baseUrl);
    //actual call that will be made:
    // return this.http.get<ProductInterface[]>(`${this.baseUrl}?search=${searchValue}`);
  }
}
