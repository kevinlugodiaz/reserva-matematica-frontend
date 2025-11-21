import { State } from '@shared/interfaces/state.interface';

export function buildEmptyState<T>(data: T): State<T> {
  return {
    isLoading: false,
    data,
    message: null,
  };
}
