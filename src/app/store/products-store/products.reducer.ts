import { createReducer, on } from '@ngrx/store';
import ProductInterface from '../../interfaces/products';
import {
  searchProducts,
  searchProductsFailure,
  searchProductsSuccess,
} from './products.actions';

export interface ProductState {
  products: ProductInterface[];
  searchValue: string;
  error: string | null;
  status: 'idle' | 'loading' | 'success' | 'failure';
}

export const initialState: ProductState = {
  products: [],
  searchValue: '',
  error: null,
  status: 'idle',
};

export const productsReducer = createReducer(
  initialState,
  on(searchProducts, (state, { searchValue }) => ({
    ...state,
    searchValue,
    status: 'loading' as const,
  })),
  on(searchProductsSuccess, (state, { products }) => ({
    ...state,
    products,
    status: 'success' as const,
  })),
  on(searchProductsFailure, (state, { error }) => ({
    ...state,
    error,
    status: 'failure' as const,
  }))
);
