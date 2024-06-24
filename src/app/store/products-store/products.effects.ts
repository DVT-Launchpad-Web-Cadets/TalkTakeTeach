import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { ProductsService } from '../../services/products.service';
import {
  searchProducts,
  searchProductsFailure,
  searchProductsSuccess,
} from './products.actions';

@Injectable()
export class ProductsEffects {
  searchProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(searchProducts),
      switchMap((action) =>
        this.productsService.getProducts(action.searchValue).pipe(
          map((products) => {
            return searchProductsSuccess({ products });
          }),
          catchError((error) => of(searchProductsFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private productsService: ProductsService
  ) {}
}
