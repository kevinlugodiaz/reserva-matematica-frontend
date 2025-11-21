import { ApiResponse } from '@core/interfaces/api-response.interface';

export async function attempt<T>(fn: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    const err = error as unknown as ApiResponse<T>;
    console.error('An error occurred:', error);
    throw err;
  }
}
