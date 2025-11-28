import { buildEmptyState } from '@shared/helpers/state.helper';
import { PaymentControlDto } from '../dto/payment-control.dto';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { PaymentControlService } from '../services/payment-control.service';
import { inject } from '@angular/core';
import { ProductCode } from '@shared/enums/branch-code.enum';
import { attempt } from '@shared/helpers/async.helper';
import { firstValueFrom } from 'rxjs';

const initialState = buildEmptyState<PaymentControlDto>({
  groups: [],
  totalConsolidado: null,
});
export const PaymentControlStore = signalStore(
  withState(initialState),
  withMethods((store, service = inject(PaymentControlService)) => ({
    find: async (productId: ProductCode, period: string) => {
      patchState(store, { isLoading: true });
      const res = await attempt(() => firstValueFrom(service.find(productId, period)));
      if (res.success) {
        patchState(store, { data: res.data, isLoading: false });
        return;
      }

      patchState(store, { ...initialState });
    },
    export: async (productId: ProductCode, period: string) => {
      return await firstValueFrom(service.export(productId, period));
    },
  })),
);
