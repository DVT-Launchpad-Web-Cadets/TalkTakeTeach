import { CurrencyPipe, DecimalPipe, NgOptimizedImage } from '@angular/common';
import { Component, Input } from '@angular/core';
import ProductInterface from '../../../interfaces/products';

@Component({
  selector: 'app-product-results',
  standalone: true,
  imports: [CurrencyPipe, DecimalPipe, NgOptimizedImage],
  templateUrl: './product-results.component.html',
  styleUrl: './product-results.component.scss',
})
export class ProductResultsComponent {
  @Input() products: ProductInterface[] = [];
}
