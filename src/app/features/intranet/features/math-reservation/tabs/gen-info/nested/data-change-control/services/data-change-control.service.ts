import { inject, Injectable } from '@angular/core';
import { ApiService } from '@core/api/api.service';
import { ProductCode } from '@shared/enums/branch-code.enum';
import { CeSummaryDto } from '../dto/ce-summary.dto';
import { EcSummaryDto } from '../dto/ec-summary.dto';

@Injectable({
  providedIn: 'root',
})
export class DataChangeControlService {
  private readonly apiService = inject(ApiService);

  // CE: Cambio Endoso
  executeCe(productId: ProductCode, period: string) {
    return this.apiService.get(
      `information-generation/data-change-control/change-endorsement/execute/${productId}/${period}`,
    );
  }

  getCeSummary(processId: number, period: string) {
    return this.apiService.get<CeSummaryDto>(
      `information-generation/data-change-control/change-endorsement/summary/${processId}/${period}`,
    );
  }

  downloadCeSummaryReport(processId: number) {
    return this.apiService.getFile(
      `information-generation/data-change-control/change-endorsement/summary/report/${processId}`,
    );
  }

  downloadCeResultReport(processId: number, variableId?: number) {
    return this.apiService.getFile(
      `information-generation/data-change-control/change-endorsement/result/report/${processId}?variable=${variableId || ''}`,
    );
  }

  // EC: Endoso Cambio
  executeEc(processId: number, period: string) {
    return this.apiService.get(
      `information-generation/data-change-control/endorsement-change/execute/${processId}/${period}`,
    );
  }

  getEcSummary(processId: number, period: string) {
    return this.apiService.get<EcSummaryDto[]>(
      `information-generation/data-change-control/endorsement-change/summary/${processId}/${period}`,
    );
  }

  downloadEcSummaryReport(processId: number) {
    return this.apiService.getFile(
      `information-generation/data-change-control/endorsement-change/export-summary/${processId}`,
    );
  }

  downloadEcResultReport(processId: number, ruleCode?: string) {
    return this.apiService.getFile(
      `information-generation/data-change-control/endorsement-change/export-detail/${processId}?variable=${ruleCode || ''}`,
    );
  }
}
