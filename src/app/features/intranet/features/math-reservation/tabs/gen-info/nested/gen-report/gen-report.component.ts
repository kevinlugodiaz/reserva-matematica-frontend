import { ApplicationRef, ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Button } from 'primeng/button';
import { Tag } from 'primeng/tag';
import { ExcelService } from '@shared/services/excel.service';
import { GenReportService } from './shared/services/gen-report.service';
import { dummy } from './dummy';
import { filter, first, interval, switchMap, take, takeWhile, tap, timer } from 'rxjs';

@Component({
  selector: 'app-gen-report',
  imports: [Button, Tag],
  templateUrl: './gen-report.component.html',
  styleUrl: './gen-report.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class GenReportComponent implements OnInit {
  private readonly excelService = inject(ExcelService);
  private readonly genReportService = inject(GenReportService);
  private readonly dummy = dummy;
  readonly existFile = signal(false);
  private readonly appRef = inject(ApplicationRef);

  ngOnInit() {
    timer(800)
      .pipe(
        switchMap(() => this.appRef.isStable),
        filter((stable) => stable),
        first(),
      )
      .subscribe(() => {
        this.exportData('202405');
      });
  }

  exportData(period: string) {
    // this.excelService.exportData(this.dummy, 'dummy-data');

    interval(5000)
      .pipe(
        switchMap(() => this.genReportService.existFile(period)),
        tap((res) => {
          console.log(res);
          this.existFile.set(res);
        }),
        filter((res) => res),
        take(1),
      )
      .subscribe();
  }

  async downloadFile() {
    const file = await this.genReportService.getReport('202405');
    this.descargarBlob(file, `reporte-202405.xls`);
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
