import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { AngularMaterialModule } from 'src/app/shared/module/angular-material/angular-material.module';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { MyJobsComponent } from './components/my-jobs/my-jobs.component';
import { NotificationsComponent } from './components/notifications/notifications.component';


@NgModule({
  declarations: [
    UserComponent,
    EditProfileComponent,
    MyJobsComponent,
    NotificationsComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    AngularMaterialModule
  ]
})
export class UserModule { }
