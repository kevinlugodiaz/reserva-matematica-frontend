import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { DataChangeControlService } from '../services/data-change-control.service';
import { buildEmptyState } from '@shared/helpers/state.helper';
import { attempt } from '@shared/helpers/async.helper';
import { catchError, EMPTY, firstValueFrom, pipe, switchMap, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { EcSummaryDto } from '../dto/ec-summary.dto';
import { LoaderService } from '@shared/services/loader.service';

const initialState = buildEmptyState<EcSummaryDto[]>([]);
export const EndorsementChangeStore = signalStore(
  withState(initialState),
  withMethods((store, service = inject(DataChangeControlService), loader = inject(LoaderService)) => ({
    executeChangeEndorsement: rxMethod<{ period: string; processId: number }>(
      pipe(
        tap(() => patchState(store, { ...initialState, isLoading: true })),
        switchMap(({ period, processId }) =>
          service.executeEc(processId, period).pipe(
            switchMap(() =>
              service.getEcSummary(processId, period).pipe(
                tapResponse({
                  next: (res) => patchState(store, { isLoading: false, data: res.data }),
                  error: () => patchState(store, { isLoading: false }),
                }),
              ),
            ),
          ),
        ),
        catchError(() => {
          patchState(store, { isLoading: false });
          return EMPTY;
        }),
      ),
    ),
    load: async (processId: number, period: string) => {
      patchState(store, { ...initialState, isLoading: true });
      const res = await attempt(() => firstValueFrom(service.getEcSummary(processId, period)));
      patchState(store, { isLoading: false, data: res.data });
    },
    downloadEcSummaryReport: async (processId: number) => {
      loader.show('Descargando resumen...');
      attempt(() => firstValueFrom(service.downloadEcSummaryReport(processId))).finally(() => loader.hide());
    },
    downloadEcResultReport: async (processId: number, rule?: string) => {
      loader.show('Descargando reporte...');
      attempt(() => firstValueFrom(service.downloadEcResultReport(processId, rule))).finally(() => loader.hide());
    },
  })),
);
