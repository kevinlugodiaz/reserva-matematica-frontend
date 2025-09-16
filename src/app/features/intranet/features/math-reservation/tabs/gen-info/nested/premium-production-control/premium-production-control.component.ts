import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal, ViewEncapsulation } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Button } from 'primeng/button';
import { DecimalPipe } from '@angular/common';
import { PremiumProductionControlStore } from '@intranet/features/math-reservation/tabs/gen-info/shared/store/premium-production-control/premium-production-control.store';
import { Tag } from 'primeng/tag';

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
  readonly premiumProductionControlStore = inject(PremiumProductionControlStore);

  items = computed(() => this.premiumProductionControlStore.data()?.benefits || []);

  ngOnInit() {
    this.premiumProductionControlStore.getPremiumProductionControl('202207');
  }

  shouldRenderGroupLabel({ label }: { label: string }, index: number): boolean {
    return this.items().findIndex((x) => x.description === label) === index;
  }
}
