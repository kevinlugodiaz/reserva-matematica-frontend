import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { DatePipe } from '@angular/common';
import { Button, ButtonDirective, ButtonIcon, ButtonLabel } from 'primeng/button';
import { Tooltip } from 'primeng/tooltip';
import { Tag } from 'primeng/tag';
import { Select } from 'primeng/select';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-record-list',
  imports: [TableModule, DatePipe, Button, Tooltip, Tag, Select, ButtonDirective, ButtonLabel, ButtonIcon, RouterLink],
  standalone: true,
  templateUrl: './record-list.component.html',
  styleUrl: './record-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RecordListComponent {
  yearsList = signal([
    {
      label: 2025,
      value: 2025,
    },
    {
      label: 2024,
      value: 2024,
    },
    {
      label: 2023,
      value: 2023,
    },
    {
      label: 2022,
      value: 2022,
    },
  ]);
  monthsList = signal([
    {
      label: 'Enero',
      value: 1,
    },
    {
      label: 'Febrero',
      value: 2,
    },
    {
      label: 'Marzo',
      value: 3,
    },
    {
      label: 'Abril',
      value: 4,
    },
    {
      label: 'Mayo',
      value: 5,
    },
    {
      label: 'Junio',
      value: 6,
    },
    {
      label: 'Julio',
      value: 7,
    },
    {
      label: 'Agosto',
      value: 8,
    },
    {
      label: 'Septiembre',
      value: 9,
    },
    {
      label: 'Octubre',
      value: 10,
    },
    {
      label: 'Noviembre',
      value: 11,
    },
    {
      label: 'Diciembre',
      value: 12,
    },
  ]);
  dataSource = signal(
    new Array(300).fill({
      id: 197823,
      name: 'Record 1',
      status: 'Creado',
      description: 'Description for Record 1',
      date: new Date('2023-01-01'),
    }),
  );
}
