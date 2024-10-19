export default function () {
	const toggleColorMode = (e: KeyboardEvent) => {
		const isCtrlPressed = e.ctrlKey;

		if (!isCtrlPressed) return;

		const secondKey = e.key;

		if (secondKey !== 'y') return;

		const { $toggleMode } = useNuxtApp();

		$toggleMode();
	};

	onMounted(() => window.addEventListener('keydown', toggleColorMode));

	onBeforeUnmount(() => window.removeEventListener('keydown', toggleColorMode));

	return { toggleColorMode };
}
