import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Button } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Message } from 'primeng/message';
import { Tag } from 'primeng/tag';
import { Tooltip } from 'primeng/tooltip';
import { DatePipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-report-gen',
  imports: [
    Button,
    TableModule,
    Message,
    Tag,
    Tooltip,
    DatePipe,
    TitleCasePipe
  ],
  standalone: true,
  templateUrl: './report-gen.component.html',
  styleUrl: './report-gen.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ReportGenComponent {
  readonly dataSource = signal<any[]>([]);

  newReport(): void {
    this.dataSource.update((currentValue) => {
      return [
        ...currentValue,
        {
          id: currentValue.length + 1,
          product: 'Renta Vitalicia',
          year: 2025,
          month: 'Enero',
          createdAt: new Date(),
          status: {
            code: 'FINISHED',
            label: 'Carga Finalizada',
            severity: 'success'
          }
        }
      ];
    });
  }
}
