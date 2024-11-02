import { Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { JobApplicationComponent } from "./components/job-application/job-application.component";
import { canActivateLogin } from "src/app/shared/guards/auth.guard";
import { ReviewApplicationComponent } from "./components/review-application/review-application.component";
import { SubmitApplicationComponent } from "./components/submit-application/submit-application.component";
import { JobSeparateDetailComponent } from "./components/job-separate-detail/job-separate-detail.component";
import { SearchResultComponent } from "./components/search-result/search-result.component";


export const homeRoutes: Routes = [
    {path:'', component:HomeComponent},
    {path:'home', component:HomeComponent},
    {path:'job-application/:id', component:JobApplicationComponent,canActivate:[canActivateLogin]},
    {path:'job-application/:id/review', component:ReviewApplicationComponent,canActivate:[canActivateLogin]},
    {path: 'submit-application/:id', component:SubmitApplicationComponent, canActivate:[canActivateLogin]},
    {path: 'job-detail/:id', component:JobSeparateDetailComponent},
    {path: 'search-result', component:SearchResultComponent}
  ];