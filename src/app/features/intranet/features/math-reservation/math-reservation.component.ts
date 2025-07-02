import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Tab, TabList, TabPanel, TabPanels, Tabs, TabsModule } from 'primeng/tabs';
import { Toolbar } from 'primeng/toolbar';
import { Select } from 'primeng/select';

import GenInfoComponent from './tabs/gen-info/gen-info.component';
import GenReservationInterfacesComponent from './tabs/gen-reservation-interfaces/gen-reservation-interfaces.component';
import FeedbackProcessComponent from './tabs/feedback-process/feedback-process.component';
import ClosingResultComponent from './tabs/closing-result/closing-result.component';
import AccountingReconciliationComponent from './tabs/accounting-reconciliation/accounting-reconciliation.component';
import ClosingReportsComponent from './tabs/closing-reports/closing-reports.component';

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
    Select
  ],
  templateUrl: './math-reservation.component.html',
  styleUrl: './math-reservation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class MathReservationComponent {

}
