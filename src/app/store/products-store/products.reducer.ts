import { createReducer, on } from '@ngrx/store';
import ProductInterface from '../../interfaces/products';
import {
  searchProducts,
  searchProductsFailure,
  searchProductsSuccess,
} from './products.actions';

export const productsFeatureKey = 'Products';

export interface ProductState {
  products: ProductInterface[];
  error: string | null;
  status: 'idle' | 'loading' | 'success' | 'failure';
}

export const initialState: ProductState = {
  products: [],
  error: null,
  status: 'idle',
};

export const productsReducer = createReducer(
  initialState,
  on(searchProducts, (state) => ({
    ...state,
    status: 'loading' as const,
  })),
  on(searchProductsSuccess, (state, { products }) => ({
    ...state,
    products,
    error: null,
    status: 'success' as const,
  })),
  on(searchProductsFailure, (state, { error }) => ({
    ...state,
    error,
    status: 'failure' as const,
  }))
);
