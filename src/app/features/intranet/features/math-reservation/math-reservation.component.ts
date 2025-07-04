import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Tab, TabList, TabPanel, TabPanels, Tabs, TabsModule } from 'primeng/tabs';
import { Toolbar } from 'primeng/toolbar';
import { Select } from 'primeng/select';

import GenInfoComponent from './tabs/gen-info/gen-info.component';
import GenReservationInterfacesComponent from './tabs/gen-reservation-interfaces/gen-reservation-interfaces.component';
import FeedbackProcessComponent from './tabs/feedback-process/feedback-process.component';
import ClosingResultComponent from './tabs/closing-result/closing-result.component';
import AccountingReconciliationComponent from './tabs/accounting-reconciliation/accounting-reconciliation.component';
import ClosingReportsComponent from './tabs/closing-reports/closing-reports.component';
import { Button } from 'primeng/button';

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
    Toolbar,
    Select,
    Button
  ],
  standalone: true,
  templateUrl: './math-reservation.component.html',
  styleUrl: './math-reservation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class MathReservationComponent {

  productsList = signal([
    {
      label: 'Renta Vitalicia',
      value: 'renta-vitalicia'
    }
  ]);
  yearsList = signal([
    {
      label: 2025,
      value: 2025
    },
    {
      label: 2024,
      value: 2024
    },
    {
      label: 2023,
      value: 2023
    },
    {
      label: 2022,
      value: 2022
    }
  ]);
  monthsList = signal([
    {
      label: 'Enero',
      value: 1
    },
    {
      label: 'Febrero',
      value: 2
    },
    {
      label: 'Marzo',
      value: 3
    },
    {
      label: 'Abril',
      value: 4
    },
    {
      label: 'Mayo',
      value: 5
    },
    {
      label: 'Junio',
      value: 6
    },
    {
      label: 'Julio',
      value: 7
    },
    {
      label: 'Agosto',
      value: 8
    },
    {
      label: 'Septiembre',
      value: 9
    },
    {
      label: 'Octubre',
      value: 10
    },
    {
      label: 'Noviembre',
      value: 11
    },
    {
      label: 'Diciembre',
      value: 12
    }
  ]);
}
