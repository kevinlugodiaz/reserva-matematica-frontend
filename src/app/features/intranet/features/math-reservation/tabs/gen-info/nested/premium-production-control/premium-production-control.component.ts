import { ChangeDetectionStrategy, Component, computed, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Button } from 'primeng/button';
import { DatePipe, DecimalPipe } from '@angular/common';
import dayjs from 'dayjs';

import { PremiumProductionControlStore } from '@intranet/features/math-reservation/tabs/gen-info/shared/store/premium-production-control/premium-production-control.store';
import { Tag } from 'primeng/tag';
import { ProcessStore } from '@intranet/shared/store/process.store';
import { ProductCode } from '@shared/enums/branch-code.enum';
import { RouterService } from '@shared/services/router.service';
import { BlockProcess } from '@intranet/shared/enums/block-process.enum';
import { StageProcess } from '@intranet/shared/enums/stage-process.enum';
import { ProcessStatus } from '@intranet/shared/enums/process-status.enum';
import { MathReservationRoutes } from '@intranet/features/math-reservation/shared/enums/math-reservation-routes.enum';
import { GenInfoRoutes } from '@intranet/features/math-reservation/tabs/gen-info/shared/enums/gen-info.routes';
import { buildMathReservationRouteUrl } from '@shared/helpers/build-route.helper';
import { AppRefService } from '@shared/services/app-ref.service';

@Component({
  selector: 'app-premium-production-control',
  imports: [TableModule, Button, DecimalPipe, Tag, DatePipe],
  templateUrl: './premium-production-control.component.html',
  styleUrl: './premium-production-control.component.scss',
  providers: [PremiumProductionControlStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export default class PremiumProductionControlComponent implements OnInit {
  private readonly router = inject(RouterService);
  private readonly appRefService = inject(AppRefService);
  readonly processStore = inject(ProcessStore);
  readonly premiumProductionControlStore = inject(PremiumProductionControlStore);

  protected readonly BlockProcess = BlockProcess;
  protected readonly StageProcess = StageProcess;
  protected readonly ProcessStatus = ProcessStatus;

  readonly lastDayPeriod = computed(() => this.getLastDayOfMonth(this.processStore.getPeriod()));

  items = computed(() => this.premiumProductionControlStore.data()?.benefits || []);

  async ngOnInit() {
    this.appRefService.isStable(async () => {
      await this.premiumProductionControlStore.getPremiumProductionControlAsync(this.processStore.getPeriod());
      this.processStore.syncStatus({
        productId: ProductCode.RentaVitalicia,
        period: this.processStore.getPeriod(),
        block: BlockProcess.GenInfo,
	      stage: StageProcess.PremiumProductionControl,
      });
    });
  }

  getLastDayOfMonth(yyyymm: string): string {
    const date = dayjs(yyyymm + '01');
    const lastDay = date.endOf('month');
    return lastDay.format('DD/MM/YYYY');
  }

  reProcess() {
    this.processStore.syncProcess({
      productId: ProductCode.RentaVitalicia,
      period: this.processStore.getPeriod(),
    });
    this.router.navigateByUrl(buildMathReservationRouteUrl([MathReservationRoutes.genInfo, GenInfoRoutes.genReport]));
  }

  downloadFile() {
    this.premiumProductionControlStore.downloadFile(this.processStore.getPeriod());
  }

  async approve() {
    await this.processStore.approveAsync({
      period: this.processStore.getPeriod(),
      productId: ProductCode.RentaVitalicia,
      block: BlockProcess.GenInfo,
      stage: StageProcess.RulesValidation,
    });

    if (!this.processStore.isStageCompleted(BlockProcess.GenInfo, StageProcess.GenReport)) {
      return;
    }

    this.router.navigateByUrl(
      buildMathReservationRouteUrl([MathReservationRoutes.genInfo, GenInfoRoutes.rulesValidation]),
    );
  }
}
