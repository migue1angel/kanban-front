import { Routes } from '@angular/router';
import { HomeComponent } from './shared/pages/home/home.component';

export const routes: Routes = [
  {
    path: 'projects',
    loadChildren: () => import('./boards/boards.routes'),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes'),
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
