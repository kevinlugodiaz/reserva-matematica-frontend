import { inject, Injectable } from '@angular/core';
import { ApiService } from '@core/api/api.service';
import { ProductCode } from '@shared/enums/branch-code.enum';
import { PaymentControlDto } from '../dto/payment-control.dto';

@Injectable({
  providedIn: 'root',
})
export class PaymentControlService {
  private readonly api = inject(ApiService);

  find(productId: ProductCode, period: string) {
    return this.api.get<PaymentControlDto>(`information-generation/control-payment/${productId}/${period}`);
  }

  export(productId: ProductCode, period: string) {
    return this.api.getFile(`information-generation/control-payment/file/${productId}/${period}`);
  }
}
