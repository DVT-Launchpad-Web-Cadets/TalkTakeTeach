import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { routes } from './app.routes';
import { ProductsEffects } from './store/products-store/products.effects';
import {
  productsFeatureKey,
  productsReducer,
} from './store/products-store/products.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(),
    provideStore(),
    provideState({ name: productsFeatureKey, reducer: productsReducer }),
    provideEffects(ProductsEffects),
  ],
};
