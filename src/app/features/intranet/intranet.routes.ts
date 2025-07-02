import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./intranet.component'),
    children: [
      {
        path: 'record-list',
        title: 'Lista de Reservas',
        loadComponent: () => import('./features/record-list/record-list.component')
      },
      {
        path: 'math-reservation',
        title: 'Reserva Matemática',
        loadComponent: () => import('./features/math-reservation/math-reservation.component')
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'record-list'
      }
    ]
  }
];
