import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { RuleValidationService } from '../services/rule-validation.service';
import { State } from '@shared/interfaces/state.interface';
import { SummaryRule } from '../interfaces/summary-rule.interface';
import { ProductCode } from '@shared/enums/branch-code.enum';

const initialState: State<SummaryRule[]> = {
  isLoading: false,
  data: [],
  message: null,
};
export const RuleValidationStore = signalStore(
  withState(initialState),
  withMethods((store, service = inject(RuleValidationService)) => ({
    async executeRules(productId: ProductCode, period: string) {
      try {
        patchState(store, { isLoading: true });
        await firstValueFrom(service.executeRules(productId, period));
        patchState(store, { isLoading: false });
      } catch (e) {
        console.error(e);
        patchState(store, { isLoading: false });
      }
    },
    async load(processId: number) {
      try {
        patchState(store, { isLoading: true });
        const res = await firstValueFrom(service.getSummary(processId));
        patchState(store, { isLoading: false, data: res.data });
      } catch (e) {
        console.error(e);
        patchState(store, { isLoading: false });
      }
    },
	  async downloadSummaryReport(processId: number) {
		  try {
			  patchState(store, { isLoading: true });
			  await firstValueFrom(service.downloadSummaryReport(processId));
			  patchState(store, { isLoading: false });
		  } catch (e) {
			  console.error(e);
			  patchState(store, { isLoading: false });
		  }
	  },
    async downloadReport(processId: number) {
      try {
        patchState(store, { isLoading: true });
        await firstValueFrom(service.downloadReport(processId));
        patchState(store, { isLoading: false });
      } catch (e) {
        console.error(e);
        patchState(store, { isLoading: false });
      }
    },
  })),
  withComputed((store) => ({
    hasErrors: computed(() => store.data().some((rule) => rule.numeroErrores)),
  })),
);
