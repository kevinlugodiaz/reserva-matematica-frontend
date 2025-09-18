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
  readonly processStore = inject(ProcessStore);
  readonly premiumProductionControlStore = inject(PremiumProductionControlStore);

  readonly lastDayPeriod = computed(() => this.getLastDayOfMonth(this.processStore.getPeriod()));

  items = computed(() => this.premiumProductionControlStore.data()?.benefits || []);

  ngOnInit() {
    this.premiumProductionControlStore.getPremiumProductionControl(this.processStore.getPeriod());
  }

  getLastDayOfMonth(yyyymm: string): string {
    const date = dayjs(yyyymm + '01'); // crea el día 1 del mes
    const lastDay = date.endOf('month'); // obtiene el último día del mes
    return lastDay.format('DD/MM/YYYY'); // formato editable
  }

  reProcess() {
    this.processStore.syncProcess({
      productId: ProductCode.RentaVitalicia,
      period: this.processStore.getPeriod(),
    });
    this.router.navigateByUrl('/intranet/math-reservation/gen-info/gen-report');
  }

  protected readonly BlockProcess = BlockProcess;
  protected readonly StageProcess = StageProcess;
  protected readonly ProcessStatus = ProcessStatus;
}
