import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployerComponent } from './employer.component';
import { CreateEmployerAccountComponent } from './components/create-employer-account/create-employer-account.component';
import { LoginEmployerComponent } from './components/login-employer/login-employer.component';
import { CreateJobComponent } from './components/create-job/create-job.component';
import { EmployerProfileComponent } from './components/employer-profile/employer-profile.component';
import { canActivateEmployer } from 'src/app/shared/guards/auth.guard';

const routes: Routes = [
  { path: '', component: EmployerComponent },
  { path: 'create-employer', component: CreateEmployerAccountComponent },
  { path: 'login-employer', component: LoginEmployerComponent },
  { path: 'profile', component: EmployerProfileComponent, canActivate:[canActivateEmployer]},
  { path: 'create-job', component: CreateJobComponent , canActivate:[canActivateEmployer]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployerRoutingModule { }
