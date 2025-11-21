import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { DataChangeControlService } from '../services/data-change-control.service';
import { buildEmptyState } from '@shared/helpers/state.helper';
import { CeSummaryDto } from '..//dto/ce-summary.dto';
import { attempt } from '@shared/helpers/async.helper';
import { catchError, EMPTY, firstValueFrom, pipe, switchMap, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { ProcessStore } from '@intranet/shared/store/process.store';
import { BlockProcess } from '@intranet/shared/enums/block-process.enum';
import { StageProcess } from '@intranet/shared/enums/stage-process.enum';
import { LoaderService } from '@shared/services/loader.service';

const initialState = buildEmptyState<CeSummaryDto>({
  resumenEndosos: [],
  rc44: [],
});
export const ChangeEndorsementStore = signalStore(
  withState(initialState),
  withMethods(
    (
      store,
      service = inject(DataChangeControlService),
      processStore = inject(ProcessStore),
      loader = inject(LoaderService),
    ) => ({
      executeChangeEndorsement: rxMethod<{ productId: number; period: string; processId: number }>(
        pipe(
          tap(() => patchState(store, { ...initialState, isLoading: true })),
          switchMap(({ productId, period, processId }) =>
            service.executeCe(productId, period).pipe(
              tap(() =>
                processStore.syncStatus({
                  productId,
                  period,
                  block: BlockProcess.GenInfo,
                  stage: StageProcess.DataChangeControl,
                }),
              ),
              switchMap(() =>
                service.getCeSummary(processId, period).pipe(
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

        const res = await attempt(() => firstValueFrom(service.getCeSummary(processId, period)));
        patchState(store, { isLoading: false, data: res.data });
      },
      downloadCeSummaryReport: async (processId: number) => {
        loader.show('Descargando resumen...');
        await attempt(() => firstValueFrom(service.downloadCeSummaryReport(processId)));
        loader.hide();
      },
      downloadCeResultReport: async (processId: number, variable?: number) => {
        loader.show('Descargando reporte...');
        await attempt(() => firstValueFrom(service.downloadCeResultReport(processId, variable)));
        loader.hide();
      },
    }),
  ),
);
