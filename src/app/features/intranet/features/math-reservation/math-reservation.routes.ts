import { Routes } from '@angular/router';
import { MathReservationRoutes } from './shared/enums/math-reservation-routes.enum';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./math-reservation.component'),
    children: [
      {
        path: MathReservationRoutes.genInfo,
        loadChildren: () => import('./tabs/gen-info/gen-info.routes').then((r) => r.routes),
      },
      {
        path: MathReservationRoutes.genReservationInterfaces,
        loadChildren: () =>
          import('./tabs/gen-reservation-interfaces/gen-reservation-interfaces.routes').then((r) => r.routes),
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'gen-info',
      },
    ],
  },
];
