import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { AngularMaterialModule } from 'src/app/shared/module/angular-material/angular-material.module';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { MyJobsComponent } from './components/my-jobs/my-jobs.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { SavedJobsComponent } from './components/saved-jobs/saved-jobs.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MyJobDetailsComponent } from './components/my-job-details/my-job-details.component';
import { UpdateStatusComponent } from './components/update-status/update-status.component';


@NgModule({
  declarations: [
    UserComponent,
    EditProfileComponent,
    MyJobsComponent,
    NotificationsComponent,
    SavedJobsComponent,
    MyJobDetailsComponent,
    UpdateStatusComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
