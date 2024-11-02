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
        // loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
      },
      // {
      //   path: 'jobs',
      //   loadChildren: () => import('./modules/jobs/jobs.module').then(m => m.JobsModule),
    
      // },
      {
        path: 'auth',
        children: authRoutes
        // loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
      },
      {
        path: 'employer',
        children: employerRoutes
        // loadChildren: () => import('./modules/employer/employer.module').then(m => m.EmployerModule)
      },
      {
        path: 'company',
        children: companyRoutes
        // loadChildren: () => import('./modules/company/company.module').then(m => m.CompanyModule)
      },
      {
        path: 'user',
        children: userRoutes,
        // loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule),
        canActivateChild: [canActivateChildLogin]
      }

];