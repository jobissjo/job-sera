import { Routes } from "@angular/router";
import { UserComponent } from "./user.component";
import { NotificationsComponent } from "./components/notifications/notifications.component";
import { SavedJobsComponent } from "./components/saved-jobs/saved-jobs.component";
import { UserDetailsComponent } from "./components/user-details/user-details.component";
import { EditProfileComponent } from "./components/edit-profile/edit-profile.component";
import { MyJobsComponent } from "./components/my-jobs/my-jobs.component";
import { MyJobDetailsComponent } from "./components/my-job-details/my-job-details.component";
import { SendMsgEmployerComponent } from "./components/send-msg-employer/send-msg-employer.component";

export const userRoutes: Routes = [
    { path: '', component: UserComponent },

    { path: 'notifications', component: NotificationsComponent },
    { path: 'saved-pages', component: SavedJobsComponent },
    { path: 'user-details', component: UserDetailsComponent },
    { path: 'edit-profile', component: EditProfileComponent },
    {
        path: 'my-jobs', component: MyJobsComponent,
        children: [
            { path: 'details', component: MyJobDetailsComponent },
        ]
    },
    { path: 'send-message/:id', component: SendMsgEmployerComponent }
];