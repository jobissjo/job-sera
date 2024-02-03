import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployerRoutingModule } from './employer-routing.module';
import { EmployerComponent } from './employer.component';
import { CreateEmployerAccountComponent } from './components/create-employer-account/create-employer-account.component';
import { AngularMaterialModule } from 'src/app/shared/module/angular-material/angular-material.module';
import { LoginEmployerComponent } from './components/login-employer/login-employer.component';
import { PersonalInfoComponent } from './components/personal-info/personal-info.component';
import { CompanyInfoComponent } from './components/company-info/company-info.component';
import { AdditionalInfoComponent } from './components/additional-info/additional-info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EmployerComponent,
    CreateEmployerAccountComponent,
    LoginEmployerComponent,
    PersonalInfoComponent,
    CompanyInfoComponent,
    AdditionalInfoComponent,
  ],
  imports: [
    CommonModule,
    EmployerRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EmployerModule { }
