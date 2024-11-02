import { Routes } from '@angular/router';
import { canActivateChildLogin } from './shared/guards/auth.guard';
import { authRoutes } from './modules/auth/auth.routes';
import { homeRoutes } from './modules/home/home.routes';
import { employerRoutes } from './modules/employer/employer.routes';
import { companyRoutes } from './modules/company/company.routes';
import { userRoutes } from './modules/user/user.routes';

export const routes: Routes = [

      {
        path: '',
        children: homeRoutes
      },
      
      {
        path: 'auth',
        children: authRoutes
        
      },
      {
        path: 'employer',
        children: employerRoutes
        
      },
      {
        path: 'company',
        children: companyRoutes
        
      },
      {
        path: 'user',
        children: userRoutes,
        canActivateChild: [canActivateChildLogin]
      }

];