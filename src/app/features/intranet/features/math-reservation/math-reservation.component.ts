import { ChangeDetectionStrategy, Component, computed, inject, signal, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PanelMenu } from 'primeng/panelmenu';
import { Router, RouterOutlet } from '@angular/router';
import { Tab, TabList, Tabs, TabsModule } from 'primeng/tabs';

import { IntranetRoutes } from '../../shared/enums/intranet-routes.enum';
import { MathReservationRoutes } from './shared/enums/math-reservation-routes.enum';
import { GenInfoRoutes } from './tabs/gen-info/shared/enums/gen-info.routes';
import { AppRoutes } from '@shared/enums/app-routes.enums';

@Component({
  selector: 'app-math-reservation',
  imports: [TabsModule, TabList, Tabs, Tab, ReactiveFormsModule, PanelMenu, RouterOutlet],
  standalone: true,
  templateUrl: './math-reservation.component.html',
  styleUrl: './math-reservation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export default class MathReservationComponent {
  private readonly router = inject(Router);

  private readonly basePath = `/${AppRoutes.intranet}/${IntranetRoutes.mathReservation}`;
  private readonly tabPaths: Record<string, string> = {
    '0': MathReservationRoutes.genInfo,
    '1': MathReservationRoutes.genReservationInterfaces,
    '2': MathReservationRoutes.feedbackProcess,
    '3': MathReservationRoutes.closingResults,
    '4': MathReservationRoutes.accountingReconciliation,
    '5': MathReservationRoutes.closingReports,
  };

  currentPath = signal<string>(this.router.url);
  menu = computed(() => [
    {
      label: '1. Generación de Información',
      expanded: true,
      items: [
        this.buildMenuItem(
          'Generar reporte',
          'bi-file-earmark-break',
          MathReservationRoutes.genInfo,
          GenInfoRoutes.genReport,
        ),
        this.buildMenuItem(
          'Validaciones de bloqueo',
          'bi-exclamation-circle',
          MathReservationRoutes.genInfo,
          GenInfoRoutes.lockValidations,
        ),
        this.buildMenuItem(
          'Excepciones reportadas (subsanables)',
          'bi-exclamation-triangle',
          MathReservationRoutes.genInfo,
          GenInfoRoutes.reportedExceptions,
        ),
        this.buildMenuItem(
          'Control de cambio de datos',
          'bi-exclamation-triangle',
          MathReservationRoutes.genInfo,
          GenInfoRoutes.dataChangeControl,
        ),
        this.buildMenuItem(
          'Control de pagos',
          'bi-bar-chart',
          MathReservationRoutes.genInfo,
          GenInfoRoutes.paymentControl,
        ),
        this.buildMenuItem(
          'Métricas adicionales',
          'bi-currency-dollar',
          MathReservationRoutes.genInfo,
          GenInfoRoutes.additionalMetrics,
        ),
        this.buildMenuItem(
          'Generación de Reportes de Validación',
          'bi-file-earmark-text',
          MathReservationRoutes.genInfo,
          GenInfoRoutes.validationReportGen,
        ),
      ],
    },
    {
      label: '2. Generación de Interfaces de Reservas',
    },
    {
      label: '3. Proceso de Retroalimentación',
    },
    {
      label: '4. Resultados de Cierre',
    },
    {
      label: '5. Registro y Conciliación Contable',
    },
    {
      label: '6. Reportes post cierre',
    },
  ]);

  validateRoute(originPath: string, path: string): string {
    const fullPath = `${this.basePath}/${originPath}/${path}`;
    return this.currentPath() === fullPath ? 'router-link-active' : '';
  }

  buildMenuItem(
    label: string,
    icon: string,
    originPath: string,
    path: string,
  ): {
    label: string;
    icon: string;
    routerLink: string[];
    styleClass: string;
    command: () => void;
  } {
    return {
      label,
      icon,
      routerLink: [this.basePath, originPath, path],
      styleClass: this.validateRoute(originPath, path),
      command: () => this.currentPath.set([this.basePath, originPath, path].join('/')),
    };
  }

  tabChange(tab: string | number): void {
    this.router.navigateByUrl(`${this.basePath}/${this.tabPaths[tab.toString()]}`);
  }
}
