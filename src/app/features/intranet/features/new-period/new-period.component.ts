import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProcessStore } from '@intranet/shared/store/process.store';
import { ProductCode } from '@shared/enums/branch-code.enum';
import { BlockProcess } from '@intranet/shared/enums/block-process.enum';
import { StageProcess } from '@intranet/shared/enums/stage-process.enum';
import { DatePipe } from '@angular/common';
import { ProcessStatus } from '@intranet/shared/enums/process-status.enum';

@Component({
  selector: 'app-new-period',
  imports: [RouterLink, DatePipe],
  templateUrl: './new-period.component.html',
  styleUrl: './new-period.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class NewPeriodComponent implements OnInit {
  readonly processStore = inject(ProcessStore);
  private readonly period = signal(localStorage.getItem('period') || '202207');
  readonly reportStatus = computed(() => {
    const report = this.processStore.data()?.status ?? [];
    return report.filter((x) => x.block === BlockProcess.GenInfo && x.stage === StageProcess.GenReport);
  });
  readonly initDate = computed(
    () => this.reportStatus().find((x) => x.statusId === ProcessStatus.InProgress)?.createdAt,
  );
  readonly endDate = computed(() => this.reportStatus().find((x) => x.statusId === ProcessStatus.Completed)?.createdAt);

  ngOnInit(): void {
    this.processStore.syncStatus({
      period: this.period(),
      productId: ProductCode.RentaVitalicia,
      block: BlockProcess.GenInfo,
      stage: StageProcess.GenReport,
    });
  }
}
