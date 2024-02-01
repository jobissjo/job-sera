import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployerRoutingModule } from './employer-routing.module';
import { EmployerComponent } from './employer.component';
import { CreateEmployerAccountComponent } from './components/create-employer-account/create-employer-account.component';
import { AngularMaterialModule } from 'src/app/shared/module/angular-material/angular-material.module';
import { LoginEmployerComponent } from './components/login-employer/login-employer.component';


@NgModule({
  declarations: [
    EmployerComponent,
    CreateEmployerAccountComponent,
    LoginEmployerComponent
  ],
  imports: [
    CommonModule,
    EmployerRoutingModule,
    AngularMaterialModule
  ]
})
export class EmployerModule { }
