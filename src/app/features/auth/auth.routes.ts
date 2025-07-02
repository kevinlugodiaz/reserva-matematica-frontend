import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./auth.component'),
    children: [
      {
        path: 'sign-in',
        title: 'Iniciar sesión | Reserva de Matematica',
        loadComponent: () => import('./sign-in/sign-in.component')
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'sign-in'
      }
    ]
  }
];
