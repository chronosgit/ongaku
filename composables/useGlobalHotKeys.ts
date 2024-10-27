export default function () {
	const manageHotKeys = (e: KeyboardEvent) => {
		// Keys
		const isCtrlPressed = e.ctrlKey;
		const secondKey = e.key;

		// Features
		const { $toggleMode, $switchLocale } = useNuxtApp();

		if (isCtrlPressed && secondKey === 'y') {
			if (typeof $toggleMode === 'function') $toggleMode();
		}

		if (isCtrlPressed && secondKey === 'b') {
			if (typeof $switchLocale === 'function') $switchLocale();
		}
	};

	onMounted(() => window.addEventListener('keydown', manageHotKeys));

	onBeforeUnmount(() => window.removeEventListener('keydown', manageHotKeys));

	return null;
}
