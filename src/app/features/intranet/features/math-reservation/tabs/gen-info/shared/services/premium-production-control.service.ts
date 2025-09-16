import { inject, Injectable } from '@angular/core';
import { ApiService } from '@core/api/api.service';
import { PremiumProductionControl } from '../interfaces/premium-production-control.interface';

@Injectable({
  providedIn: 'root',
})
export class PremiumProductionControlService {
  private readonly apiService = inject(ApiService);

  getPremiumProductionControl(period: string) {
    return this.apiService.get<PremiumProductionControl>(`sync/production-control-premium/${period}`);
  }
}
