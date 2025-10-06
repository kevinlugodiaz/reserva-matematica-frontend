import { ChangeDetectionStrategy, Component, computed, inject, signal, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PanelMenu } from 'primeng/panelmenu';
import { Router, RouterOutlet } from '@angular/router';
import { Tab, TabList, Tabs, TabsModule } from 'primeng/tabs';
import { MenuItem } from 'primeng/api';

import { ProcessStore } from '@intranet/shared/store/process.store';
import { MathReservationRoutes } from './shared/enums/math-reservation-routes.enum';
import { GenInfoRoutes } from './tabs/gen-info/shared/enums/gen-info.routes';
import { StageProcess } from '@intranet/shared/enums/stage-process.enum';
import { BlockProcess } from '@intranet/shared/enums/block-process.enum';
import { ProcessStatus } from '@intranet/shared/enums/process-status.enum';
import { buildMathReservationRouteUrl } from '@shared/helpers/build-route.helper';

type ProcessStatusIcon = 'approved' | 'success' | 'error' | 'pending' | null;

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
  private readonly processStore = inject(ProcessStore);

  private readonly tabPaths: Record<string, string> = {
    '0': MathReservationRoutes.genInfo,
    '1': MathReservationRoutes.genReservationInterfaces,
    '2': MathReservationRoutes.feedbackProcess,
    '3': MathReservationRoutes.closingResults,
    '4': MathReservationRoutes.accountingReconciliation,
    '5': MathReservationRoutes.closingReports,
  };

  currentPath = signal<string>(this.router.url);
  menu = computed((): MenuItem[] => [
    {
      label: '1. Generación de Información',
      icon: 'bi-dash-circle-fill',
      expanded: this.currentPath().includes(MathReservationRoutes.genInfo),
      items: [
        this.buildMenuItem(
          'Generar reporte (Foto del mes)',
          this.buildIcon(BlockProcess.GenInfo, StageProcess.GenReport),
          MathReservationRoutes.genInfo,
          GenInfoRoutes.genReport,
        ),
        this.buildMenuItem(
          'Control de producción de primas',
          this.buildIcon(BlockProcess.GenInfo, StageProcess.PremiumProductionControl),
          MathReservationRoutes.genInfo,
          GenInfoRoutes.premiumProductionControl,
        ),
        this.buildMenuItem(
          'Reglas de Validación',
          this.buildIcon(BlockProcess.GenInfo, StageProcess.RulesValidation),
          MathReservationRoutes.genInfo,
          GenInfoRoutes.rulesValidation,
        ),
        this.buildMenuItem(
          'Control de cambio de datos',
          this.buildIcon(BlockProcess.GenInfo, StageProcess.DataChangeControl),
          MathReservationRoutes.genInfo,
          GenInfoRoutes.dataChangeControl,
        ),
        this.buildMenuItem(
          'Control de pagos',
          this.buildIcon(BlockProcess.GenInfo, StageProcess.PaymentControl),
          MathReservationRoutes.genInfo,
          GenInfoRoutes.paymentControl,
        ),
        this.buildMenuItem(
          'Métricas adicionales',
          this.buildIcon(BlockProcess.GenInfo, StageProcess.AdditionalMetrics),
          MathReservationRoutes.genInfo,
          GenInfoRoutes.additionalMetrics,
        ),
        this.buildMenuItem(
          'Generación de Reportes de Validación',
          this.buildIcon(BlockProcess.GenInfo, StageProcess.ValidationReportGen),
          MathReservationRoutes.genInfo,
          GenInfoRoutes.validationReportGen,
        ),
      ],
    },
    {
      label: '2. Generación de Interfaces de Reservas',
      expanded: this.currentPath().includes(MathReservationRoutes.genReservationInterfaces),
    },
    {
      label: '3. Proceso de Retroalimentación',
      expanded: this.currentPath().includes(MathReservationRoutes.feedbackProcess),
    },
    {
      label: '4. Resultados de Cierre',
      expanded: this.currentPath().includes(MathReservationRoutes.closingResults),
    },
    {
      label: '5. Registro y Conciliación Contable',
      expanded: this.currentPath().includes(MathReservationRoutes.accountingReconciliation),
    },
    {
      label: '6. Reportes post cierre',
      expanded: this.currentPath().includes(MathReservationRoutes.closingReports),
    },
  ]);

  /**
   * Construye un objeto de ítem de menú para el PanelMenu.
   * @param label Etiqueta visible del ítem.
   * @param icon Estado del ícono: 'success', 'error', 'pending' o null.
   * @param originPath Ruta base del ítem.
   * @param path Ruta específica del ítem.
   * @returns Objeto con propiedades para el ítem de menú.
   */
  buildMenuItem(label: string, icon: string, originPath: string, path: string): MenuItem {
    const pathUrl = buildMathReservationRouteUrl([originPath, path]);
    return {
      label,
      icon,
      routerLink: pathUrl,
    };
  }

  private buildIcon(block: BlockProcess, stage: StageProcess): string {
    const isApproved = this.processStore.isStageCompleted(block, stage);
    if (isApproved) {
      return this.getIconCode('approved');
    }

    const status = this.processStore.getStatus(block, stage);
    if (!status) {
      return this.getIconCode('pending');
    }

    switch (status.statusId) {
      case ProcessStatus.Completed:
        return this.getIconCode('success');
      case ProcessStatus.Failed:
      case ProcessStatus.Disrupted:
        return this.getIconCode('error');
      default:
        return this.getIconCode('pending');
    }
  }

  private getIconCode(icon: ProcessStatusIcon): string {
    switch (icon) {
      case 'approved':
        return 'bi-check-circle-fill';
      case 'success':
        return 'bi-check-circle';
      case 'error':
        return 'bi-x-circle-fill';
      default:
        return 'bi-dash-circle-fill';
    }
  }

  tabChange(tab: string | number): void {
    const path = buildMathReservationRouteUrl([this.tabPaths[tab.toString()]]);
    this.navigate(path);
  }

  navigate(path: string): void {
    this.router.navigateByUrl(path).then(() => {
      this.currentPath.set(this.router.url);
    });
  }
}
