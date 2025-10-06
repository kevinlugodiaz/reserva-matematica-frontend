export interface State<T> {
	isLoading: boolean;
	data: T;
	message: string | null;
}
