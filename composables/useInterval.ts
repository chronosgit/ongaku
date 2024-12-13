export default function (callback: () => void, interval = 1000) {
	let timer: ReturnType<typeof setInterval> | null = null;

	const mountCallback = () => {
		if (timer === null) {
			timer = setInterval(() => {
				callback();
			}, interval);
		}
	};

	const unmountCallback = () => {
		if (timer !== null) {
			clearInterval(timer);
			timer = null;
		}
	};

	onMounted(() => mountCallback());
	onUnmounted(() => unmountCallback());

	return { mountCallback, unmountCallback };
}
