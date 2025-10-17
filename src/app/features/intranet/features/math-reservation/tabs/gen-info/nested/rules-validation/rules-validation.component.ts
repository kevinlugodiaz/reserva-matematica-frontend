import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';

import { ProcessStore } from '@intranet/shared/store/process.store';
import { RuleValidationStore } from './store/rule-validation.store';
import { AppRefService } from '@shared/services/app-ref.service';
import { ProductCode } from '@shared/enums/branch-code.enum';
import { BlockProcess } from '@intranet/shared/enums/block-process.enum';
import { StageProcess } from '@intranet/shared/enums/stage-process.enum';
import { TableModule } from 'primeng/table';
import { DecimalPipe } from '@angular/common';
import { Tag } from 'primeng/tag';
import { Button } from 'primeng/button';
import { ProcessStatus } from '@intranet/shared/enums/process-status.enum';
import { buildMathReservationRouteUrl } from '@shared/helpers/build-route.helper';
import { MathReservationRoutes } from '@intranet/features/math-reservation/shared/enums/math-reservation-routes.enum';
import { GenInfoRoutes } from '@intranet/features/math-reservation/tabs/gen-info/shared/enums/gen-info.routes';
import { RouterService } from '@shared/services/router.service';

@Component({
  selector: 'app-rules-validation',
  imports: [TableModule, Tag, Button, DecimalPipe],
  templateUrl: './rules-validation.component.html',
  providers: [RuleValidationStore],
  styleUrl: './rules-validation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RulesValidationComponent implements OnInit {
  private readonly appRefService = inject(AppRefService);
  private readonly router = inject(RouterService);

  readonly processStore = inject(ProcessStore);
  readonly ruleValidationStore = inject(RuleValidationStore);

  isStageCompleted = computed(() =>
    this.processStore.isStageCompleted(BlockProcess.GenInfo, StageProcess.RulesValidation),
  );

  protected readonly BlockProcess = BlockProcess;
  protected readonly StageProcess = StageProcess;
  protected readonly ProcessStatus = ProcessStatus;

  ngOnInit() {
    this.appRefService.isStable(async () => {
      this.processStore.syncStatus({
        productId: ProductCode.RentaVitalicia,
        period: this.processStore.getPeriod(),
        block: BlockProcess.GenInfo,
        stage: StageProcess.RulesValidation,
      });
      await this.ruleValidationStore.executeRules(ProductCode.RentaVitalicia, this.processStore.getPeriod());
      this.ruleValidationStore.load(this.processStore.getId());
    });
  }

  reProcess() {
    this.processStore.syncProcess({
      productId: ProductCode.RentaVitalicia,
      period: this.processStore.getPeriod(),
    });
  }

  downloadReport() {
    this.ruleValidationStore.downloadReport(this.processStore.getId());
  }

	downloadSummaryReport() {
		this.ruleValidationStore.downloadSummaryReport(this.processStore.getId());
	}

  async approve() {
    await this.processStore.approveAsync({
      productId: ProductCode.RentaVitalicia,
      period: this.processStore.getPeriod(),
      block: BlockProcess.GenInfo,
      stage: StageProcess.DataChangeControl,
    });

    if (!this.processStore.isStageCompleted(BlockProcess.GenInfo, StageProcess.RulesValidation)) {
      return;
    }

    this.router.navigateByUrl(
      buildMathReservationRouteUrl([MathReservationRoutes.genInfo, GenInfoRoutes.dataChangeControl]),
    );
  }

  downloadReportMonthPhoto() {
    this.processStore.getFile({
      productId: ProductCode.RentaVitalicia,
      period: this.processStore.getPeriod(),
      block: BlockProcess.GenInfo,
      stage: StageProcess.GenReport,
    });
  }
}
