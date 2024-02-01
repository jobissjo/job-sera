import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployerComponent } from './employer.component';
import { CreateEmployerAccountComponent } from './components/create-employer-account/create-employer-account.component';
import { LoginEmployerComponent } from './components/login-employer/login-employer.component';

const routes: Routes = [
  { path: '', component: EmployerComponent },
  { path: 'create-employer', component: CreateEmployerAccountComponent },
  {path: 'login-employer', component:LoginEmployerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployerRoutingModule { }
