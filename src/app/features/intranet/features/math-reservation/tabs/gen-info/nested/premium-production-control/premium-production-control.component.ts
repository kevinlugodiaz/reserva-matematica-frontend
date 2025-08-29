import { ChangeDetectionStrategy, Component, signal, ViewEncapsulation } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Button } from 'primeng/button';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-premium-production-control',
  imports: [TableModule, Button, DecimalPipe],
  templateUrl: './premium-production-control.component.html',
  styleUrl: './premium-production-control.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export default class PremiumProductionControlComponent {
  items = signal([
    {
      label: 'SOBREVIVENCIA',
      currency: 'Soles',
      premium: 20000,
      accounting: 20000,
      diff: 0,
    },
    {
      label: 'SOBREVIVENCIA',
      currency: 'Dolares',
      premium: 20000,
      accounting: 20000,
      diff: 0,
    },
    {
      label: 'JUBILACIÓN LEGAL',
      currency: 'Soles',
      premium: 20000,
      accounting: 20000,
      diff: 0,
    },
    {
      label: 'JUBILACIÓN LEGAL',
      currency: 'Dolares',
      premium: 20000,
      accounting: 20000,
      diff: 0,
    },
    {
      label: 'JUBILACIÓN ANTICIPADA',
      currency: 'Soles',
      premium: 20000,
      accounting: 20000,
      diff: 0,
    },
    {
      label: 'JUBILACIÓN ANTICIPADA',
      currency: 'Dolares',
      premium: 20000,
      accounting: 20000,
      diff: 0,
    },
    {
      label: 'INVALIDEZ PARCIAL',
      currency: 'Soles',
      premium: 20000,
      accounting: 20000,
      diff: 0,
    },
    {
      label: 'INVALIDEZ PARCIAL',
      currency: 'Dolares',
      premium: 20000,
      accounting: 20000,
      diff: 0,
    },
    {
      label: 'INVALIDEZ TOTAL',
      currency: 'Soles',
      premium: 20000,
      accounting: 20000,
      diff: 0,
    },
    {
      label: 'INVALIDEZ TOTAL',
      currency: 'Dolares',
      premium: 20000,
      accounting: 20000,
      diff: 0,
    },
  ]);

  shouldRenderGroupLabel({ label }: { label: string }, index: number): boolean {
    return this.items().findIndex((x) => x.label === label) === index;
  }
}
