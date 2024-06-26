import { createAction, props } from '@ngrx/store';
import ProductInterface from '../../interfaces/products';

export const searchProducts = createAction(
  '[Search Component] Search Products',
  props<{ searchValue: string }>()
);

export const searchProductsSuccess = createAction(
  '[Products API] Search Products Success',
  props<{ products: ProductInterface[] }>()
);

export const searchProductsFailure = createAction(
  '[Products API] Search Products Failure',
  props<{ error: string }>()
);
