import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductResultsComponent } from './product-results/product-results.component';
import { SearchComponent } from './search/search.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductResultsComponent, SearchComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
