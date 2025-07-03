import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from 'primeng/tabs';
import ReportGenComponent from './nested/report-gen/report-gen.component';
import PremiumProductionControlComponent
  from './nested/premium-production-control/premium-production-control.component';
import ValidationRulesComponent from './nested/validation-rules/validation-rules.component';
import DataChangeControlComponent from './nested/data-change-control/data-change-control.component';
import PaymentControlComponent from './nested/payment-control/payment-control.component';
import AdditionalMetricsComponent from './nested/additional-metrics/additional-metrics.component';
import ValidationReportGenComponent from './nested/validation-report-gen/validation-report-gen.component';

@Component({
  selector: 'app-gen-info',
  imports: [
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    ReportGenComponent,
    PremiumProductionControlComponent,
    ValidationRulesComponent,
    DataChangeControlComponent,
    PaymentControlComponent,
    AdditionalMetricsComponent,
    ValidationReportGenComponent
  ],
  templateUrl: './gen-info.component.html',
  styleUrl: './gen-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class GenInfoComponent {
}
