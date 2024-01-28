import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './shared/module/angular-material/angular-material.module';
import { SharedModule } from './shared/shared.module';
import { environment } from '../environment/environment';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [
    {provide:'FIREBASE_CONFIG', useValue:environment.firebase}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
