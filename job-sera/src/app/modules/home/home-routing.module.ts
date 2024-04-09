import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { JobApplicationComponent } from './components/job-application/job-application.component';
import { canActivateLogin } from 'src/app/shared/guards/auth.guard';
import { ReviewApplicationComponent } from './components/review-application/review-application.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'home', component:HomeComponent},
  {path:'job-application/:id', component:JobApplicationComponent,canActivate:[canActivateLogin]},
  {path:'job-application/:id/review', component:ReviewApplicationComponent,canActivate:[canActivateLogin]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
