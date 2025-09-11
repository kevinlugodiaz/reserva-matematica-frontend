import { inject, Injectable } from '@angular/core';
import { ApiService } from '@core/api/api.service';
import { ProductCode } from '@shared/enums/branch-code.enum';

@Injectable({
  providedIn: 'root',
})
export class GenReportService {
  private readonly apiService = inject(ApiService);

  existFile(period: string) {
    return this.apiService.get(`process/status/${ProductCode.RentaVitalicia}/${period}`);
  }

  getReport(period: string) {
    return this.apiService.getFile(`process/file/${ProductCode.RentaVitalicia}/${period}`);
  }
}
