import { getState, patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, EMPTY, expand, firstValueFrom, pipe, switchMap, tap, timer } from 'rxjs';

import { StorageService } from '@shared/services/storage.service';
import { ProcessService } from '../services/process.service';
import { ProcessModel } from '../models/process.model';
import { State } from '@shared/interfaces/state.interface';
import { SyncProcessRequest } from '../interfaces/sync-process.interface';
import { tapResponse } from '@ngrx/operators';
import { ProductCode } from '@shared/enums/branch-code.enum';
import { StageProcess } from '../enums/stage-process.enum';
import { ProcessStatusModel } from '@intranet/shared/models/process-status.model';
import { ProcessStatus } from '@intranet/shared/enums/process-status.enum';
import { BlockProcess } from '@intranet/shared/enums/block-process.enum';
import { ApproveStageRequest } from '@intranet/shared/interfaces/approve-stage.interface';

type ProcessState = State<ProcessModel | null>;

interface ProcessPayload {
  productId: ProductCode;
  period: string;
  block?: BlockProcess;
  stage?: StageProcess;
}

const initialState: ProcessState = {
  isLoading: false,
  data: null,
  message: null,
};

export const ProcessStore = signalStore(
  { providedIn: 'root' },
  withState((storageService = inject(StorageService)) => {
    const savedState = storageService.get('process');
    return (savedState ?? initialState) as ProcessState;
  }),
  withMethods((store, processService = inject(ProcessService), storageService = inject(StorageService)) => ({
    syncProcess: rxMethod(
      pipe(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        tap((_: SyncProcessRequest) => patchState(store, { isLoading: true, data: null })),
        switchMap((payload: SyncProcessRequest) =>
          processService.syncProcess(payload).pipe(
            tapResponse({
              next: (res) => {
                patchState(store, {
                  isLoading: true,
                  data: {
										period: payload.period,
                    status: ProcessStatusModel.build(res.data),
                  },
                });
                storageService.set('process', getState(store));
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
    getStatus: rxMethod(
      pipe(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        tap((_: ProcessPayload) => patchState(store, { isLoading: true })),
        switchMap(({ productId, period }: ProcessPayload) =>
          processService.getStatus(productId, period).pipe(
            expand((response) => {
              const isCompleted =
                response.data?.idEstado === ProcessStatus.Completed ||
                response.data?.idEstado === ProcessStatus.Disrupted ||
                response.data?.idEstado === ProcessStatus.Failed ||
                response.data?.idEstado === ProcessStatus.Pending;
              return isCompleted
                ? EMPTY
                : timer(10000).pipe(switchMap(() => processService.getStatus(productId, period)));
            }),
            tap((response) => {
              const isCompleted =
                response.data?.idEstado === ProcessStatus.Completed ||
                response.data?.idEstado === ProcessStatus.Disrupted ||
                response.data?.idEstado === ProcessStatus.Failed ||
                response.data?.idEstado === ProcessStatus.Pending;

              patchState(store, {
                isLoading: !isCompleted,
                data: {
	                status: ProcessStatusModel.build(response.data),
                },
              });
              storageService.set('process', getState(store));
            }),
            catchError(() => {
              patchState(store, { isLoading: false });
              return EMPTY;
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
          processService.getFile(productId, period, block!, stage!).pipe(
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
    approveAsync: async (req: ApproveStageRequest) => {
      patchState(store, { isLoading: true });
      try {
        const res = await firstValueFrom(processService.approveStage(req));
        patchState(store, {
          isLoading: false,
          data: {
            status: ProcessStatusModel.build(res.data),
          },
        });
        storageService.set('process', getState(store));
      } catch (error) {
        console.log(error);
        patchState(store, { isLoading: false });
      }
    },
    isStageCompleted: (block: BlockProcess, stage: StageProcess) => {
      const state = getState(store);
      const status = state.data?.status;

      if (!status) {
        return false;
      }

      const statusConcat = Number(`${status.block}${status.stage}`);
      const ref = Number(`${block}${stage}`);
      return statusConcat > ref;
    },
  })),
  withComputed((store) => ({
    getProcessStatus: computed(() => store.data()?.status),
  })),
);
