import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { State } from '@shared/interfaces/state.interface';
import { PremiumProductionControl } from '@intranet/features/math-reservation/tabs/gen-info/shared/interfaces/premium-production-control.interface';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { ApiResponse } from '@core/interfaces/api-response.interface';
import { inject } from '@angular/core';
import { PremiumProductionControlService } from '@intranet/features/math-reservation/tabs/gen-info/shared/services/premium-production-control.service';

const initialState: State<PremiumProductionControl | null> = {
  isLoading: false,
  data: null,
  message: null,
};
export const PremiumProductionControlStore = signalStore(
  withState(initialState),
  withMethods((store, premiumProductionService = inject(PremiumProductionControlService)) => ({
    getPremiumProductionControl: rxMethod(
      pipe(
	      // eslint-disable-next-line @typescript-eslint/no-unused-vars
        tap((_: string) => patchState(store, { isLoading: true })),
        switchMap((period: string) =>
          premiumProductionService.getPremiumProductionControl(period).pipe(
            tapResponse({
              next: (response) => {
                patchState(store, { isLoading: false, data: response.data });
              },
              error: (error: ApiResponse<null>) => {
                patchState(store, { isLoading: false, data: null, message: error.message });
              },
            }),
          ),
        ),
      ),
    ),
  })),
);
