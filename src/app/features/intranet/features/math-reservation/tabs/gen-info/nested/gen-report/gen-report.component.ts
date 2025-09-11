import {
  ApplicationRef,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { Button } from 'primeng/button';
import { Tag } from 'primeng/tag';
import { GenReportService } from './shared/services/gen-report.service';
import { ProcessStore } from '@intranet/shared/store/process.store';
import { ProductCode } from '@shared/enums/branch-code.enum';
import { ProcessStatus } from '@intranet/shared/enums/process-status.enum';
import { BlockProcess } from '@intranet/shared/enums/block-process.enum';
import { StageProcess } from '@intranet/shared/enums/stage-process.enum';

@Component({
  selector: 'app-gen-report',
  imports: [Button, Tag],
  templateUrl: './gen-report.component.html',
  styleUrl: './gen-report.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class GenReportComponent implements OnInit {
  readonly processStore = inject(ProcessStore);
  private readonly genReportService = inject(GenReportService);

  private readonly monthLabel = {
    '01': 'Enero',
    '02': 'Febrero',
    '03': 'Marzo',
    '04': 'Abril',
    '05': 'Mayo',
    '06': 'Junio',
    '07': 'Julio',
    '08': 'Agosto',
    '09': 'Septiembre',
    '10': 'Octubre',
    '11': 'Noviembre',
    '12': 'Diciembre',
  };
  readonly ProcessStatus = ProcessStatus;
  private readonly period = signal(localStorage.getItem('period') || '202405');

  readonly periodLabel = computed(() => {
    const year = this.period().substring(0, 4);
    const month = this.period().substring(4, 6);
    return `${this.monthLabel[month as keyof typeof this.monthLabel]} ${year}`;
  });

  constructor() {
    const interval = setInterval(() => {
      this.processStore.getStatus({
        period: this.period(),
        productId: ProductCode.RentaVitalicia,
        block: BlockProcess.GenInfo,
        stage: StageProcess.GenReport,
      });
    }, 7000);

    effect(() => {
      if (this.processStore.data()?.status?.statusId === ProcessStatus.Completed) {
        clearInterval(interval);
      }
    });
  }

  ngOnInit() {
    this.processStore.getStatus({
      period: this.period(),
      productId: ProductCode.RentaVitalicia,
      block: BlockProcess.GenInfo,
      stage: StageProcess.GenReport,
    });
  }

  syncProcess() {
    this.processStore.syncProcess({
      period: this.period(),
      productId: ProductCode.RentaVitalicia,
    });
  }

  async downloadFile() {
    this.processStore.getFile({
      productId: ProductCode.RentaVitalicia,
      period: this.period(),
      block: BlockProcess.GenInfo,
      stage: StageProcess.GenReport,
    });
  }
}
