import type IToast from '~/interfaces/IToast';

export type FCreateToast = (toast: IToast) => void;

export default function () {
	const toasts = ref<IToast[]>([]);

	const createToast: FCreateToast = (toast: IToast) => {
		toasts.value.push(toast);
	};

	const removeToast = (toastId: string) => {
		const idOfThisToast = toasts.value.findIndex((t) => t.id === toastId);

		if (idOfThisToast === -1) {
			console.warn(`Toast with id ${toastId} doesn't exist`);
			return;
		}

		toasts.value.splice(idOfThisToast, 1);
	};

	return { toasts, createToast, removeToast };
}
