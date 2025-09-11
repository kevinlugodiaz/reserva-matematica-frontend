import { ChangeDetectionStrategy, Component, computed, inject, signal, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PanelMenu } from 'primeng/panelmenu';
import { Router, RouterOutlet } from '@angular/router';
import { Tab, TabList, Tabs, TabsModule } from 'primeng/tabs';

import { IntranetRoutes } from '../../shared/enums/intranet-routes.enum';
import { MathReservationRoutes } from './shared/enums/math-reservation-routes.enum';
import { GenInfoRoutes } from './tabs/gen-info/shared/enums/gen-info.routes';
import { AppRoutes } from '@shared/enums/app-routes.enums';
import { ProcessStore } from '@intranet/shared/store/process.store';
import { StageProcess } from '@intranet/shared/enums/stage-process.enum';
import { BlockProcess } from '@intranet/shared/enums/block-process.enum';
import { ProcessStatusModel } from '@intranet/shared/models/process-status.model';

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
      icon: 'bi-dash-circle-fill',
      expanded: this.currentPath().includes(MathReservationRoutes.genInfo),
      command: () => this.navigate([this.basePath, MathReservationRoutes.genInfo, GenInfoRoutes.genReport].join('/')),
      items: [
        this.buildMenuItem(
          'Generar reporte (Foto del mes)',
          this.validateCheckStage(this.processStore.data()?.status, BlockProcess.GenInfo, StageProcess.GenReport)
            ? 'success'
            : null,
          MathReservationRoutes.genInfo,
          GenInfoRoutes.genReport,
        ),
        this.buildMenuItem(
          'Control de producción de primas',
          null,
          MathReservationRoutes.genInfo,
          GenInfoRoutes.premiumProductionControl,
        ),
        this.buildMenuItem(
          'Reglas de Validación',
          null,
          MathReservationRoutes.genInfo,
          GenInfoRoutes.validationReportGen,
        ),
        this.buildMenuItem(
          'Control de cambio de datos',
          null,
          MathReservationRoutes.genInfo,
          GenInfoRoutes.dataChangeControl,
        ),
        this.buildMenuItem('Control de pagos', null, MathReservationRoutes.genInfo, GenInfoRoutes.paymentControl),
        this.buildMenuItem(
          'Métricas adicionales',
          null,
          MathReservationRoutes.genInfo,
          GenInfoRoutes.additionalMetrics,
        ),
        this.buildMenuItem(
          'Generación de Reportes de Validación',
          null,
          MathReservationRoutes.genInfo,
          GenInfoRoutes.validationReportGen,
        ),
      ],
    },
    {
      label: '2. Generación de Interfaces de Reservas',
      routerLink: [this.basePath, MathReservationRoutes.genReservationInterfaces],
      expanded: this.currentPath().includes(MathReservationRoutes.genReservationInterfaces),
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

  validateCheckStage(currentStatus: ProcessStatusModel | undefined, block: BlockProcess, stage: StageProcess): boolean {
    if (!currentStatus) {
      return false;
    }

    const status = Number(`${currentStatus.block}${currentStatus.stage}`);
    const ref = Number(`${block}${stage}`);

    console.log(status);
    console.log(ref);

    return status > ref;
  }

  validateRoute(originPath: string, path: string): string {
    const fullPath = `${this.basePath}/${originPath}/${path}`;
    return this.currentPath() === fullPath ? 'router-link-active' : '';
  }

  /**
   * Construye un objeto de ítem de menú para el PanelMenu.
   * @param label Etiqueta visible del ítem.
   * @param icon Estado del ícono: 'success', 'error', 'pending' o null.
   * @param originPath Ruta base del ítem.
   * @param path Ruta específica del ítem.
   * @returns Objeto con propiedades para el ítem de menú.
   */
  buildMenuItem(
    label: string,
    icon: 'success' | 'error' | 'pending' | null,
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
      icon: icon === 'success' ? 'bi-check-circle-fill' : icon === 'error' ? 'bi-x-circle-fill' : 'bi-dash-circle-fill',
      routerLink: [this.basePath, originPath, path],
      styleClass: this.validateRoute(originPath, path),
      command: () => this.currentPath.set([this.basePath, originPath, path].join('/')),
    };
  }

  tabChange(tab: string | number): void {
    const path = `${this.basePath}/${this.tabPaths[tab.toString()]}`;
    this.navigate(path);
  }

  navigate(path: string): void {
    this.router.navigateByUrl(path).then(() => {
      this.currentPath.set(this.router.url);
    });
  }
}
