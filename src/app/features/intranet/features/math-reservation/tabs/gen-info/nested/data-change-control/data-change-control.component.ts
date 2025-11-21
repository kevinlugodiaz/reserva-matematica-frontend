import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { Tag } from 'primeng/tag';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from 'primeng/tabs';
import { ProductCode } from '@shared/enums/branch-code.enum';
import { TableModule } from 'primeng/table';
import { Divider } from 'primeng/divider';
import { Button } from 'primeng/button';

import { getLastDayOfPeriod } from '@shared/utils/date.util';
import { CeSummary } from './dto/ce-summary.dto';
import { ProcessStore } from '@intranet/shared/store/process.store';
import { ChangeEndorsementStore } from './stores/change-endorsement.store';
import { EndorsementChangeStore } from './stores/endorsement-change.store';
import { ProcessStatus } from '@intranet/shared/enums/process-status.enum';
import { BlockProcess } from '@intranet/shared/enums/block-process.enum';
import { StageProcess } from '@intranet/shared/enums/stage-process.enum';
import { EcSummaryDto } from '@intranet/features/math-reservation/tabs/gen-info/nested/data-change-control/dto/ec-summary.dto';

@Component({
  selector: 'app-data-change-control',
  imports: [DatePipe, Tag, Tabs, TabList, Tab, TabPanels, TabPanel, TableModule, DecimalPipe, Divider, Button],
  providers: [ChangeEndorsementStore, EndorsementChangeStore],
  standalone: true,
  templateUrl: './data-change-control.component.html',
  styleUrl: './data-change-control.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DataChangeControlComponent implements OnInit {
  protected readonly BlockProcess = BlockProcess;
  protected readonly StageProcess = StageProcess;
  protected readonly ProcessStatus = ProcessStatus;

  readonly processStore = inject(ProcessStore);
  readonly changeEndorsementStore = inject(ChangeEndorsementStore);
  readonly endorsementChangeStore = inject(EndorsementChangeStore);

  isStageCompleted = computed(() =>
    this.processStore.isStageCompleted(BlockProcess.GenInfo, StageProcess.DataChangeControl),
  );
  readonly lastDayPeriod = computed(() => getLastDayOfPeriod(this.processStore.getPeriod()));

  ngOnInit() {
    this.changeEndorsementStore.executeChangeEndorsement({
      productId: ProductCode.RentaVitalicia,
      period: this.processStore.getPeriod(),
      processId: this.processStore.getId(),
    });
  }

  changeTab(event: string | number) {
    if (+event == 0) {
      if (this.changeEndorsementStore.data().resumenEndosos.length > 0) {
        return;
      }

      this.changeEndorsementStore.executeChangeEndorsement({
        productId: ProductCode.RentaVitalicia,
        period: this.processStore.getPeriod(),
        processId: this.processStore.getId(),
      });
      return;
    }

    if (this.endorsementChangeStore.data().length > 0) {
      return;
    }

    this.endorsementChangeStore.executeChangeEndorsement({
      period: this.processStore.getPeriod(),
      processId: this.processStore.getId(),
    });
  }

  downloadVariableReport({ idVariable }: CeSummary) {
    this.changeEndorsementStore.downloadCeResultReport(this.processStore.getId(), idVariable);
  }

  downloadCeReport() {
    this.changeEndorsementStore.downloadCeResultReport(this.processStore.getId());
  }

  downloadCeSummaryReport() {
    this.changeEndorsementStore.downloadCeSummaryReport(this.processStore.getId());
  }

  downloadRuleReport({ codigoRegla }: EcSummaryDto) {
    this.endorsementChangeStore.downloadEcResultReport(this.processStore.getId(), codigoRegla);
  }

  downloadEcReport() {
    this.endorsementChangeStore.downloadEcResultReport(this.processStore.getId());
  }

  downloadEcSummaryReport() {
    this.endorsementChangeStore.downloadEcSummaryReport(this.processStore.getId());
  }
}
