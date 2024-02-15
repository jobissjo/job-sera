import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { MyJobsComponent } from './components/my-jobs/my-jobs.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { SavedJobsComponent } from './components/saved-jobs/saved-jobs.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { MyJobDetailsComponent } from './components/my-job-details/my-job-details.component';

const routes: Routes = [
  { path: '', component: UserComponent },
  
  { path: 'notifications', component: NotificationsComponent },
  { path: 'saved-pages', component: SavedJobsComponent },
  {path: 'edit-profile', component:EditProfileComponent},
  { path: 'my-jobs', component: MyJobsComponent ,
children:[
  {path:'details', component:MyJobDetailsComponent}
]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
