import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState, productsFeatureKey } from './products.reducer';

const selectProducts = createFeatureSelector<ProductState>(productsFeatureKey);

export const SelectProducts = createSelector(
  selectProducts,
  (state) => state.products
);
