import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./intranet.component'),
    children: [
      {
        path: 'record-list',
        title: 'Lista de Reservas',
        loadComponent: () => import('./features/record-list/record-list.component'),
      },
      {
        path: 'new-period',
        title: 'Nuevo Período',
        loadComponent: () => import('./features/new-period/new-period.component'),
      },
      {
        path: 'math-reservation',
        title: 'Proceso de Generación de Reservas Matemáticas',
        loadComponent: () => import('./features/math-reservation/math-reservation.component'),
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'record-list',
      },
    ],
  },
];
