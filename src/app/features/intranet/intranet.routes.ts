import { Routes } from '@angular/router';
import { IntranetRoutes } from './shared/enums/intranet-routes.enum';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./intranet.component'),
    children: [
      {
        path: IntranetRoutes.recordList,
        title: 'Lista de Reservas',
        loadComponent: () => import('./features/record-list/record-list.component'),
      },
      {
        path: IntranetRoutes.newPeriod,
        title: 'Nuevo Período',
        loadComponent: () => import('./features/new-period/new-period.component'),
      },
      {
        path: IntranetRoutes.mathReservation,
        title: 'Proceso de Generación de Reservas Matemáticas',
        loadChildren: () => import('./features/math-reservation/math-reservation.routes').then((r) => r.routes),
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'record-list',
      },
    ],
  },
];
