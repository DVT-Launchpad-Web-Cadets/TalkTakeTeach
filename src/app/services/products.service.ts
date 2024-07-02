import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import ProductInterface from '../interfaces/products';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private searchUrl = environment.baseUrl + environment.searchSuffix;

  constructor(private http: HttpClient) {}

  getProducts(searchValue: string): Observable<ProductInterface[]> {
    return this.http.get<ProductInterface[]>(this.searchUrl + searchValue);
    //actual call that will be made:
    // return this.http.get<ProductInterface[]>(`${this.baseUrl}?search=${searchValue}`);
  }
}
