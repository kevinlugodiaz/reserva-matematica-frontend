import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then(r => r.routes)
  },
  {
    path: 'intranet',
    loadChildren: () => import('./features/intranet/intranet.routes').then(r => r.routes)
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'intranet'
  }
];
