import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';

import { StorageService } from '@shared/services/storage.service';
import { ProcessService } from '../services/process.service';
import { ProcessModel } from '../models/process.model';
import { State } from '@shared/interfaces/state.interface';
import { SyncProcessRequest } from '../interfaces/sync-process.interface';
import { tapResponse } from '@ngrx/operators';
import { ProductCode } from '@shared/enums/branch-code.enum';
import { BlockProcess } from '../enums/block-process.enum';
import { StageProcess } from '../enums/stage-process.enum';
import { ProcessStatusModel } from '@intranet/shared/models/process-status.model';

type ProcessState = State<ProcessModel | null>;

interface ProcessPayload {
  productId: ProductCode;
  period: string;
  block: BlockProcess;
  stage: StageProcess;
}

const initialState: ProcessState = {
  isLoading: false,
  data: null,
  message: null,
};
export const ProcessStore = signalStore(
  { providedIn: 'root' },
  withState((storageService = inject(StorageService)) => {
    const savedState = storageService.get('');
    return (savedState ?? initialState) as ProcessState;
  }),
  withMethods((store, processService = inject(ProcessService)) => ({
    syncProcess: rxMethod(
      pipe(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        tap((_: SyncProcessRequest) => patchState(store, { isLoading: true })),
        switchMap((payload: SyncProcessRequest) =>
          processService.syncProcess(payload).pipe(
            tapResponse({
              next: () => patchState(store, { isLoading: false }),
              error: (error) => {
                console.log(error);
                patchState(store, { isLoading: false });
              },
            }),
          ),
        ),
      ),
    ),
    getStatus: rxMethod(
      pipe(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        tap((_: ProcessPayload) => patchState(store, { isLoading: true })),
        switchMap(({ productId, period, block, stage }: ProcessPayload) =>
          processService.getStatus(productId, period, block, stage).pipe(
            tapResponse({
              next: (response) => {
                patchState(store, {
                  isLoading: false,
                  data: {
                    status: ProcessStatusModel.build(response.data),
                  },
                });
              },
              error: (error) => {
                console.log(error);
                patchState(store, { isLoading: false });
              },
            }),
          ),
        ),
      ),
    ),
    getFile: rxMethod(
      pipe(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        tap((_: ProcessPayload) => patchState(store, { isLoading: true })),
        switchMap(({ productId, period, block, stage }: ProcessPayload) =>
          processService.getFile(productId, period, block, stage).pipe(
            tapResponse({
              next: () => {
                patchState(store, { isLoading: false });
              },
              error: (error) => {
                console.log(error);
                patchState(store, { isLoading: false });
              },
            }),
          ),
        ),
      ),
    ),
  })),
);
