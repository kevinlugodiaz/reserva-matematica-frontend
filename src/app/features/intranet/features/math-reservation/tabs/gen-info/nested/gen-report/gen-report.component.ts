import { ApplicationRef, ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { Button } from 'primeng/button';
import { Tag } from 'primeng/tag';
import { GenReportService } from './shared/services/gen-report.service';
import { filter, first, interval, switchMap, take, tap, timer } from 'rxjs';

@Component({
  selector: 'app-gen-report',
  imports: [Button, Tag],
  templateUrl: './gen-report.component.html',
  styleUrl: './gen-report.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class GenReportComponent implements OnInit {
  private readonly genReportService = inject(GenReportService);
  readonly existFile = signal(false);
  private readonly appRef = inject(ApplicationRef);
  private readonly period = signal(localStorage.getItem('period') || '202405');

  private readonly monthLabel = {
    '01': 'Enero',
    '02': 'Febrero',
    '03': 'Marzo',
    '04': 'Abril',
    '05': 'Mayo',
    '06': 'Junio',
    '07': 'Julio',
    '08': 'Agosto',
    '09': 'Septiembre',
    '10': 'Octubre',
    '11': 'Noviembre',
    '12': 'Diciembre',
  };

  readonly periodLabel = computed(() => {
    const year = this.period().substring(0, 4);
    const month = this.period().substring(4, 6);
    return `${this.monthLabel[month as keyof typeof this.monthLabel]} ${year}`;
  });

  ngOnInit() {
    timer(800)
      .pipe(
        switchMap(() => this.appRef.isStable),
        filter((stable) => stable),
        first(),
      )
      .subscribe(() => {
        this.exportData(this.period());
      });
  }

  exportData(period: string) {
    // this.excelService.exportData(this.dummy, 'dummy-data');

    interval(5000)
      .pipe(
        switchMap(() => this.genReportService.existFile(period)),
        tap((res) => this.existFile.set(res)),
        filter((res) => res),
        take(1),
      )
      .subscribe();
  }

  async downloadFile() {
    const file = await this.genReportService.getReport(this.period());
    this.descargarBlob(file, `reporte-${this.period()}.xls`);
  }

  descargarBlob(blob: Blob, nombreArchivo: string): void {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = nombreArchivo;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }
}
