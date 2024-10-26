export type ToastType = 'success' | 'info' | 'warn' | 'error' | 'neutral';

export default interface IToast {
	id: string;
	type: ToastType;
	message: string;
	lifespan: number;
	tw?: string;
}
