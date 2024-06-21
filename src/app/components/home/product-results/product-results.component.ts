import { NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import ProductInterface from '../../../interfaces/products';

@Component({
  selector: 'app-product-results',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './product-results.component.html',
  styleUrl: './product-results.component.scss',
})
export class ProductResultsComponent implements OnInit {
  @Input() products: ProductInterface[] = [];

  ngOnInit(): void {
    // console.log(this.products);
  }
}
