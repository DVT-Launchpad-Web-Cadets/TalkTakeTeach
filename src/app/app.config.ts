import { provideHttpClient, withFetch } from '@angular/common/http';
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
import { ChatEffects } from './store/chats-store/chats.effects';
import { chatFeatureKey, chatReducer } from './store/chats-store/chats.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideStore(),
    provideState({ name: productsFeatureKey, reducer: productsReducer }),
    provideState({ name: chatFeatureKey, reducer: chatReducer }),
    provideEffects(ProductsEffects, ChatEffects),
  ],
};
