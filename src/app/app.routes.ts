import { Routes } from '@angular/router';
import { HomeComponent } from './shared/pages/home/home.component';
import { notAuthenticatedGuard } from './shared/guards/not-authenticated.guard';

export const routes: Routes = [
  {
    path: 'projects',
    loadChildren: () => import('./boards/boards.routes'),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes'),
    canMatch: [notAuthenticatedGuard],
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
