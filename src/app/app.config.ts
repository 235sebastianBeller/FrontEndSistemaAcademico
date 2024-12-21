import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage';
import {
  provideHttpClient,
  withInterceptorsFromDi,
  withInterceptors,
} from '@angular/common/http';
import { authInterceptor } from './interceptors/auth.interceptor'; 
import { errorHandlerInterceptor } from './interceptors/error-handler.interceptor';
import { offlineInterceptor } from './interceptors/offline.interceptor';
import {environment} from '@envs/environment'


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi(),
    withInterceptors([offlineInterceptor,authInterceptor,errorHandlerInterceptor])
  ), 

    provideAnimationsAsync(),
    provideFirebaseApp(() =>
      initializeApp({
        apiKey: environment.API_KEY_FIRE_BASE,
        authDomain: environment.AUTH_DOMAIN,
        projectId: environment.PROJECT_ID,
        storageBucket: environment.STORAGE_BUCKET,
        messagingSenderId: environment.MESSAGING_SENDER,
        appId: environment.APP_ID,
        measurementId: environment.MEASUREMENT_ID
      })
    ),
    provideStorage(() => getStorage()),

    
  ],
};
