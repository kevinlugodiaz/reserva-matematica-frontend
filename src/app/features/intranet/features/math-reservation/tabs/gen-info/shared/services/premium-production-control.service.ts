import { inject, Injectable } from '@angular/core';
import { ApiService } from '@core/api/api.service';
import { PremiumProductionControl } from '../interfaces/premium-production-control.interface';
import { ProductCode } from '@shared/enums/branch-code.enum';

@Injectable({
  providedIn: 'root',
})
export class PremiumProductionControlService {
  private readonly apiService = inject(ApiService);

  getPremiumProductionControl(product: ProductCode, period: string) {
    return this.apiService.get<PremiumProductionControl>(`gen-info/production-control-premium/${product}/${period}`);
  }

  downloadFile(product: ProductCode, period: string) {
    return this.apiService.getFile(`gen-info/production-control-premium/file/${product}/${period}`);
  }
}
