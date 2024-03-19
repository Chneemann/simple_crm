import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    importProvidersFrom(
      provideFirebaseApp(() =>
        initializeApp({
          apiKey: 'AIzaSyCtPt7s_A-GdIqaWYEgfe5ap6PDTOPmHbQ',
          authDomain: 'simplecrm-357b6.firebaseapp.com',
          projectId: 'simplecrm-357b6',
          storageBucket: 'simplecrm-357b6.appspot.com',
          messagingSenderId: '644138815706',
          appId: '1:644138815706:web:51e689cbf41e9c643015e3',
        })
      )
    ),
    importProvidersFrom(provideFirestore(() => getFirestore())),
  ],
};
