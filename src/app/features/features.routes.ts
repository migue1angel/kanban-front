import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

export const featuresRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

export default featuresRoutes;
