import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { PaymentControlStore } from './stores/payment-control.store';
import { ProcessStore } from '@intranet/shared/store/process.store';
import { ProductCode } from '@shared/enums/branch-code.enum';
import { BlockProcess } from '@intranet/shared/enums/block-process.enum';
import { StageProcess } from '@intranet/shared/enums/stage-process.enum';
import { DatePipe } from '@angular/common';
import { Tag } from 'primeng/tag';
import { ProcessStatus } from '@intranet/shared/enums/process-status.enum';
import { TableModule } from 'primeng/table';
import { Button } from 'primeng/button';
import { buildMathReservationRouteUrl } from '@shared/helpers/build-route.helper';
import { MathReservationRoutes } from '@intranet/features/math-reservation/shared/enums/math-reservation-routes.enum';
import { GenInfoRoutes } from '@intranet/features/math-reservation/tabs/gen-info/shared/enums/gen-info.routes';
import { RouterService } from '@shared/services/router.service';

@Component({
  selector: 'app-payment-control',
  imports: [DatePipe, Tag, TableModule, Button],
  providers: [PaymentControlStore],
  templateUrl: './payment-control.component.html',
  styleUrl: './payment-control.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PaymentControlComponent implements OnInit {
  private readonly router = inject(RouterService);

  readonly processStore = inject(ProcessStore);
  readonly paymentControlStore = inject(PaymentControlStore);

  protected readonly BlockProcess = BlockProcess;
  protected readonly StageProcess = StageProcess;
  protected readonly ProcessStatus = ProcessStatus;

  ngOnInit() {
    this.paymentControlStore.find(ProductCode.RentaVitalicia, this.processStore.getPeriod());
  }

  downloadFile() {
    this.paymentControlStore.export(ProductCode.RentaVitalicia, this.processStore.getPeriod());
  }

  reProcess() {
    this.processStore.syncProcess({
      productId: ProductCode.RentaVitalicia,
      period: this.processStore.getPeriod(),
    });
    this.router.navigateByUrl(buildMathReservationRouteUrl([MathReservationRoutes.genInfo, GenInfoRoutes.genReport]));
  }

  async approve() {
    await this.processStore.approveAsync({
      period: this.processStore.getPeriod(),
      productId: ProductCode.RentaVitalicia,
      block: BlockProcess.GenInfo,
      stage: StageProcess.AdditionalMetrics,
    });

    if (!this.processStore.isStageCompleted(BlockProcess.GenInfo, StageProcess.PaymentControl)) {
      return;
    }

    this.router.navigateByUrl(
      buildMathReservationRouteUrl([MathReservationRoutes.genInfo, GenInfoRoutes.additionalMetrics]),
    );
  }
}
