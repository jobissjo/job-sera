import { Routes } from "@angular/router";
import { AuthComponent } from "./auth.component";
import { SignInComponent } from "./components/sign-in/sign-in.component";
import { SignUpComponent } from "./components/sign-up/sign-up.component";
import { ForgotPasswordComponent } from "./components/forgot-password/forgot-password.component";
import { ChangePasswordComponent } from "./components/change-password/change-password.component";
import { canActivateLogin } from "src/app/shared/guards/auth.guard";

export const authRoutes: Routes = [
  { path: '', component: AuthComponent },
  {path:'sign-in',component:SignInComponent},
  {path:'sign-up', component:SignUpComponent},
  {path:'forgot-password', component:ForgotPasswordComponent, canActivate:[canActivateLogin]},
  {path:'change-password', component:ChangePasswordComponent, canActivate:[canActivateLogin]}

]