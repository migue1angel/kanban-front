import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BoardsLayoutComponent } from './layout/boards-layout/boards-layout.component';
import { BoardListComponent } from './pages/board-list/board-list.component';

export const boardsRoutes: Routes = [
  {
    path: '',
    component: BoardsLayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'board-list',
        component: BoardListComponent,
      },
      {
        path: 'board/:id',
        loadComponent: () =>
          import('./pages/board-detail/board-detail.component'),
      },
      {
        path: '**',
        redirectTo: 'dashboard',
      },
    ],
  },
];

export default boardsRoutes;
