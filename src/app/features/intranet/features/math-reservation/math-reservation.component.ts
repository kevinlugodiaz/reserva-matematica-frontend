import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Tab, TabList, TabPanel, TabPanels, Tabs, TabsModule } from 'primeng/tabs';

import GenInfoComponent from './tabs/gen-info/gen-info.component';
import GenReservationInterfacesComponent from './tabs/gen-reservation-interfaces/gen-reservation-interfaces.component';
import FeedbackProcessComponent from './tabs/feedback-process/feedback-process.component';
import ClosingResultComponent from './tabs/closing-result/closing-result.component';
import AccountingReconciliationComponent from './tabs/accounting-reconciliation/accounting-reconciliation.component';
import ClosingReportsComponent from './tabs/closing-reports/closing-reports.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { PanelMenu } from 'primeng/panelmenu';
import { Tag } from 'primeng/tag';

@Component({
  selector: 'app-math-reservation',
  imports: [
    TabsModule,
    TabList,
    Tabs,
    Tab,
    TabPanels,
    TabPanel,
    GenInfoComponent,
    GenReservationInterfacesComponent,
    FeedbackProcessComponent,
    ClosingResultComponent,
    AccountingReconciliationComponent,
    ClosingReportsComponent,
    ReactiveFormsModule,
    PanelMenu,
    Tag,
  ],
  standalone: true,
  templateUrl: './math-reservation.component.html',
  styleUrl: './math-reservation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MathReservationComponent {
  menu = signal([
    {
      label: '1. Generación de Información',
      expanded: true,
      items: [
        {
          label: 'Generar reporte',
          icon: 'bi bi-file-earmark-break',
        },
        {
          label: 'Validaciones de bloqueo',
          icon: 'bi-exclamation-circle',
        },
        {
          label: 'Excepciones reportadas (subsanables)',
          icon: 'bi-exclamation-triangle',
        },
        {
          label: 'Control de cambio de datos',
          icon: 'bi bi-currency-dollar',
        },
        {
          label: 'Control de pagos',
          icon: 'bi bi-bar-chart',
        },
        {
          label: 'Métricas adicionales',
          icon: 'bi bi-currency-dollar',
        },
        {
          label: 'Generación de Reportes de Validación',
          icon: 'bi bi-file-earmark-text',
        },
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

  productControl = new FormControl(['renta-vitalicia']);
}
