import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideAnimationsAsync(),
		importProvidersFrom(BrowserAnimationsModule),
		providePrimeNG({
			theme: {
				preset: Aura,
				options: {
					darkModeSelector: false,
				},
			},
		}),
		provideRouter(routes),
	],
};
