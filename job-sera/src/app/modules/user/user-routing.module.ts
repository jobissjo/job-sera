import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { MyJobsComponent } from './components/my-jobs/my-jobs.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { SavedJobsComponent } from './components/saved-jobs/saved-jobs.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';

const routes: Routes = [
  { path: '', component: UserComponent },
  { path: 'my-jobs', component: MyJobsComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'saved-pages', component: SavedJobsComponent },
  {path: 'edit-profile', component:EditProfileComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
