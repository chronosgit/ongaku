export default function (parentKey: string) {
	const { templateRef, isActive, activate, disactivate } =
		useClickawayClient(parentKey);

	const coords = ref<{ x: number | null; y: number | null }>({
		x: null,
		y: null,
	});

	const dims = ref<{ width: number | null; height: null }>({
		width: null,
		height: null,
	});

	const openCtxMenu = (e: MouseEvent) => {
		coords.value = { x: e.clientX, y: e.clientY };

		activate();
	};

	const closeCtxMenu = () => {
		coords.value = { x: null, y: null };

		disactivate();
	};

	const toggleCtxMenu = (e: MouseEvent) => {
		if (isActive.value) closeCtxMenu();
		else openCtxMenu(e);
	};

	return {
		isOpened: isActive,
		coords,
		openCtxMenu,
		closeCtxMenu,
		toggleCtxMenu,
	};
}
