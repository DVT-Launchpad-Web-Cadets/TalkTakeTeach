import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import ProductInterface from '../../../interfaces/products';
import { ProductsService } from '../../../services/products.service';
import { AsyncPipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe, NgFor],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit {
  searchValue: string = '';
  products: ProductInterface[] = [];
  searchForm = this.fb.nonNullable.group({
    searchValue: '',
  });

  constructor(
    private productsService: ProductsService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.productsService
      .getProducts('searchValue')
      .subscribe((productsData) => {
        console.log(productsData);
        this.products = productsData;
      });
  }

  onSearchSubmit() {
    this.searchValue = this.searchForm.value.searchValue ?? '';
    this.fetchData();
  }
}
