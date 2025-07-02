import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { DatePipe } from '@angular/common';
import { Button } from 'primeng/button';
import { Tooltip } from 'primeng/tooltip';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';

@Component({
  selector: 'app-record-list',
  imports: [
    TableModule,
    DatePipe,
    Button,
    Tooltip,
    IconField,
    InputIcon,
    InputText
  ],
  templateUrl: './record-list.component.html',
  styleUrl: './record-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class RecordListComponent {
  dataSource = signal(new Array(300).fill({
    id: 1,
    name: 'Record 1',
    description: 'Description for Record 1',
    date: new Date('2023-01-01')
  }));
}
