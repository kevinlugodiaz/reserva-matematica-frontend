import { registerLocaleData } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import localeEsPe from '@angular/common/locales/es-PE';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { environment } from '@env';

registerLocaleData(localeEsPe);

if (environment.isProduction) {
	// eslint-disable-next-line @typescript-eslint/no-empty-function
  console.log = () => {};
}

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
