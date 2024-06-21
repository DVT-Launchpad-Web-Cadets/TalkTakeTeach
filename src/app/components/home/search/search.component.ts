import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import ProductInterface from '../../../interfaces/products';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe, NgFor, NgIf],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit, OnDestroy {
  searchValue: string = '';
  products: ProductInterface[] = [];
  debounceTime = 300;
  isFocused: boolean = false;
  searchForm = this.fb.nonNullable.group({
    searchValue: '',
  });

  trigger = this.searchForm.controls.searchValue.valueChanges.pipe(
    debounceTime(this.debounceTime),
    distinctUntilChanged()
  );

  subscriptions: Subscription[] = [];

  constructor(
    private productsService: ProductsService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    const sub = this.searchForm.controls.searchValue.valueChanges
      .pipe(debounceTime(this.debounceTime), distinctUntilChanged())
      .subscribe((currentValue) => {
        this.searchValue = currentValue;
        this.fetchData();
      });

    this.subscriptions.push(sub);
    this.fetchData();
  }

  fetchData() {
    // this.productsService
    //   .getProducts(this.searchValue)
    //   .subscribe((productsData) => {
    //     this.products = productsData;
    //   });
  }

  clearInput() {
    this.searchForm.controls.searchValue.setValue('');
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
