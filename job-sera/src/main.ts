import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// import { AppModule } from './app/app.module';
import { bootstrapApplication } from '@angular/platform-browser';

bootstrapApplication(AppComponent, appConfig)
 .catch((err)=> console.error(err))


import { defineComponents, IgcRatingComponent } from 'igniteui-webcomponents';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

defineComponents(IgcRatingComponent);


// Initialize Firebase app


// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.error(err));
