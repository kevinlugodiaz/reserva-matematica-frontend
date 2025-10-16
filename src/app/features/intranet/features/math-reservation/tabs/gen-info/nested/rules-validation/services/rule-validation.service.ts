import { inject, Injectable } from '@angular/core';
import { ApiService } from '@core/api/api.service';
import { SummaryRule } from '../interfaces/summary-rule.interface';
import { ProductCode } from '@shared/enums/branch-code.enum';

@Injectable({
  providedIn: 'root',
})
export class RuleValidationService {
  private readonly http = inject(ApiService);

  executeRules(productId: ProductCode, period: string) {
    return this.http.get<boolean>(`information-generation/validation-rules/execute/${productId}/${period}`);
  }

  getSummary(processId: number) {
    return this.http.get<SummaryRule[]>(`information-generation/validation-rules/summary/${processId}`);
  }

  downloadReport(processId: number) {
    return this.http.getFile(`information-generation/validation-rules/result/${processId}`);
  }
}
