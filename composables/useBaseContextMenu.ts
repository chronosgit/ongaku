export default function (baseCtxMenuTemplateRef: string) {
	const { isActive, activate, disactivate } = useClickawayClient(
		baseCtxMenuTemplateRef
	);

	const coords = ref<{ x: number | null; y: number | null }>({
		x: null,
		y: null,
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
		console.log(e);

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
