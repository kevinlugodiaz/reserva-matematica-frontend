import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { Button } from 'primeng/button';
import { Tag } from 'primeng/tag';
import { ProcessStore } from '@intranet/shared/store/process.store';
import { ProductCode } from '@shared/enums/branch-code.enum';
import { ProcessStatus } from '@intranet/shared/enums/process-status.enum';
import { BlockProcess } from '@intranet/shared/enums/block-process.enum';
import { StageProcess } from '@intranet/shared/enums/stage-process.enum';
import { DatePipe } from '@angular/common';
import { RouterService } from '@shared/services/router.service';
import { GenInfoRoutes } from '@intranet/features/math-reservation/tabs/gen-info/shared/enums/gen-info.routes';
import { MathReservationRoutes } from '@intranet/features/math-reservation/shared/enums/math-reservation-routes.enum';
import { buildMathReservationRouteUrl } from '@shared/helpers/build-route.helper';
import { AppRefService } from '@shared/services/app-ref.service';

@Component({
  selector: 'app-gen-report',
  imports: [Button, Tag, DatePipe],
  templateUrl: './gen-report.component.html',
  styleUrl: './gen-report.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class GenReportComponent implements OnInit {
  private readonly appRefService = inject(AppRefService);
  private readonly router = inject(RouterService);
  readonly processStore = inject(ProcessStore);

  protected readonly ProcessStatus = ProcessStatus;
  protected readonly BlockProcess = BlockProcess;
  protected readonly StageProcess = StageProcess;

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

  private readonly period = signal(localStorage.getItem('period') || '202405');

  readonly periodLabel = computed(() => {
    const year = this.period().substring(0, 4);
    const month = this.period().substring(4, 6);
    return `${this.monthLabel[month as keyof typeof this.monthLabel]} ${year}`;
  });

  ngOnInit() {
    this.appRefService.isStable(() => {
      this.processStore.syncStatus({
        period: this.period(),
        productId: ProductCode.RentaVitalicia,
        block: BlockProcess.GenInfo,
        stage: StageProcess.GenReport,
      });
    });
  }

  syncProcess() {
    this.processStore.syncProcess({
      period: this.period(),
      productId: ProductCode.RentaVitalicia,
    });

    setTimeout(() => {
      this.processStore.syncStatus({
        period: this.period(),
        productId: ProductCode.RentaVitalicia,
        block: BlockProcess.GenInfo,
        stage: StageProcess.GenReport,
      });
    }, 5000);
  }

  async downloadFile() {
    this.processStore.getFile({
      productId: ProductCode.RentaVitalicia,
      period: this.period(),
      block: BlockProcess.GenInfo,
      stage: StageProcess.GenReport,
    });
  }

  async approve() {
    await this.processStore.approveAsync({
      period: this.period(),
      productId: ProductCode.RentaVitalicia,
      block: BlockProcess.GenInfo,
      stage: StageProcess.PremiumProductionControl,
    });

    if (this.processStore.isStageCompleted(BlockProcess.GenInfo, StageProcess.GenReport)) {
      this.router.navigateByUrl(
        buildMathReservationRouteUrl([MathReservationRoutes.genInfo, GenInfoRoutes.premiumProductionControl]),
      );
    }
  }
}
