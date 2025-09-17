import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal, ViewEncapsulation } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Button } from 'primeng/button';
import { DecimalPipe } from '@angular/common';
import { PremiumProductionControlStore } from '@intranet/features/math-reservation/tabs/gen-info/shared/store/premium-production-control/premium-production-control.store';
import { Tag } from 'primeng/tag';
import { ProcessStore } from '@intranet/shared/store/process.store';
import { ProductCode } from '@shared/enums/branch-code.enum';
import { RouterService } from '@shared/services/router.service';

@Component({
  selector: 'app-premium-production-control',
  imports: [TableModule, Button, DecimalPipe, Tag],
  templateUrl: './premium-production-control.component.html',
  styleUrl: './premium-production-control.component.scss',
  providers: [PremiumProductionControlStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export default class PremiumProductionControlComponent implements OnInit {
  private readonly router = inject(RouterService);
  private readonly processStore = inject(ProcessStore);
  readonly premiumProductionControlStore = inject(PremiumProductionControlStore);

  items = computed(() => this.premiumProductionControlStore.data()?.benefits || []);

  ngOnInit() {
    this.premiumProductionControlStore.getPremiumProductionControl('202207');
  }

  reProcess() {
    this.processStore.syncProcess({
      productId: ProductCode.RentaVitalicia,
      period: '202207',
    });
    this.router.navigateByUrl('/intranet/math-reservation/gen-info/gen-report');
  }
}
