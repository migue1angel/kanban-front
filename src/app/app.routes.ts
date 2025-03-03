import { Routes } from '@angular/router';
import { MainComponent } from './layout/main/main.component';

export const routes: Routes = [
  {
    path: 'main',
    component: MainComponent,
    loadChildren: () => import('./features/features.routes'),
  },
  {
    path: '**',
    redirectTo: 'main',
  },
];
