export default function () {
	const router = useRouter();
	const localePath = useLocalePath();

	const input = ref('');
	const timer = ref<ReturnType<typeof setTimeout> | null>(null);

	watch(input, (newV, oldV) => {
		if (timer.value != null) clearTimeout(timer.value);

		timer.value = setTimeout(() => {
			const newQ = newV.trim();
			const oldQ = oldV.trim();

			if ((!newQ && oldQ) || newQ) {
				const path = localePath(`/search/${encodeURIComponent(newV)}`);

				router.push({ path });
			}
		}, 500);
	});

	return { input };
}
