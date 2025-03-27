import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BoardsLayoutComponent } from './layout/boards-layout/boards-layout.component';
import { BoardListComponent } from './pages/board-list/board-list.component';
import { CalendarComponent } from './pages/calendar/calendar.component';

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
        path: 'boards',
        // component: BoardListComponent,
        children: [
          {
            path: 'list',
            component: BoardListComponent,
          },
          {
            path: ':id',
            loadComponent: () =>
              import('./pages/board-detail/board-detail.component'),
          },
          {
            path: '**',
            redirectTo: 'list',
          },
        ],
      },
      {
        path: 'calendar',
        component: CalendarComponent,
      },
      {
        path: '**',
        redirectTo: 'dashboard',
      },
    ],
  },
];

export default boardsRoutes;
