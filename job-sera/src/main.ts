import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';





// Initialize Firebase app


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
