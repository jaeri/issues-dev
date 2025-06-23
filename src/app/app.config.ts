import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';  
import { definePreset } from '@primeng/themes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';


import { routes } from './app.routes';
import MyPreset from './themes/mypreset';

export const appConfig: ApplicationConfig = {
  providers: [
    ConfirmationService,
    MessageService,
    provideAnimationsAsync(),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    providePrimeNG({
      theme: {
        preset:Aura,
       
      }
    })
  ]
};
