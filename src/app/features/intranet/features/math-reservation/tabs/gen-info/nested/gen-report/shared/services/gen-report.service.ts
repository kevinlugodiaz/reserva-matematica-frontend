import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, firstValueFrom, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GenReportService {
  private readonly http = inject(HttpClient);

  existFile(period: string) {
    return this.http
      .head(`/reports/reporte-${period}.xls`, {
        observe: 'response',
      })
      .pipe(
        map((res) => res.status === 200),
        catchError((error) => of(error.status === 200 || false)),
      );
  }

  async getReport(period: string) {
    return await firstValueFrom(
      this.http.get(`/reports/reporte-${period}.xls`, {
        responseType: 'blob',
      }),
    );
  }
}
