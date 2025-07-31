import { Routes } from '@angular/router';
import { GenInfoRoutes } from './shared/enums/gen-info.routes';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./gen-info.component'),
    children: [
      {
        path: GenInfoRoutes.genReport,
        loadComponent: () => import('./nested/gen-report/gen-report.component'),
      },
      {
        path: GenInfoRoutes.premiumProductionControl,
        loadComponent: () => import('./nested/premium-production-control/premium-production-control.component'),
      },
      {
        path: GenInfoRoutes.dataChangeControl,
        loadComponent: () => import('./nested/data-change-control/data-change-control.component'),
      },
      {
        path: GenInfoRoutes.paymentControl,
        loadComponent: () => import('./nested/payment-control/payment-control.component'),
      },
      {
        path: GenInfoRoutes.additionalMetrics,
        loadComponent: () => import('./nested/additional-metrics/additional-metrics.component'),
      },
      {
        path: GenInfoRoutes.validationReportGen,
        loadComponent: () => import('./nested/validation-report-gen/validation-report-gen.component'),
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: GenInfoRoutes.genReport,
      },
    ],
  },
];
