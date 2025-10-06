export interface ApiResponse<T> {
	statusCode: number;
  success: boolean;
  data: T;
  message: string | null;
}
