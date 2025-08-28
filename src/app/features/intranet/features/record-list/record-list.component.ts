import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { DatePipe } from '@angular/common';
import { Button } from 'primeng/button';
import { Tooltip } from 'primeng/tooltip';
import { Tag } from 'primeng/tag';
import { Select } from 'primeng/select';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-record-list',
  imports: [TableModule, DatePipe, Button, Tooltip, Tag, Select, ReactiveFormsModule],
  standalone: true,
  templateUrl: './record-list.component.html',
  styleUrl: './record-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RecordListComponent {
  private readonly router = inject(Router);
  private readonly builder = inject(FormBuilder);

  yearControl = this.builder.control<number | null>(null);
  monthControl = this.builder.control<number | null>(null);

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

  setCurrentDate() {
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    this.yearControl.setValue(currentYear);
    this.monthControl.setValue(currentMonth);
  }

  goToGenReport() {
    localStorage.setItem('period', `${this.yearControl.value}${this.monthControl.value!.toString().padStart(2, '0')}`);
    this.router.navigate(['/intranet/new-period']);
  }
}
