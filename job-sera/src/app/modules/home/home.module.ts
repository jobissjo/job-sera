import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { JobsListComponent } from './components/jobs-list/jobs-list.component';
import { JobsDetailsComponent } from './components/jobs-details/jobs-details.component';
import { JobSearchComponent } from './components/job-search/job-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/shared/module/angular-material/angular-material.module';
import { JobApplicationComponent } from './components/job-application/job-application.component';
import { ReviewApplicationComponent } from './components/review-application/review-application.component';
import { SubmitApplicationComponent } from './components/submit-application/submit-application.component';
import { JobSeparateDetailComponent } from './components/job-separate-detail/job-separate-detail.component';


@NgModule({
  declarations: [
    HomeComponent,
    JobsListComponent,
    JobsDetailsComponent,
    JobSearchComponent,
    JobApplicationComponent,
    ReviewApplicationComponent,
    SubmitApplicationComponent,
    JobSeparateDetailComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    AngularMaterialModule
  ]
})
export class HomeModule { }
