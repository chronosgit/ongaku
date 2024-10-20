export const useColorModeStore = defineStore('colorMode', () => {
	const { $toggleMode } = useNuxtApp();

	const theme = useCookie('theme');

	const isDarkMode = ref<boolean | null>(null);

	const toggleMode = () => {
		if (theme.value === 'dark') theme.value = 'light';
		else theme.value = 'dark';

		$toggleMode();
	};

	watch(
		theme,
		(newTheme) => {
			if (!newTheme) return;

			isDarkMode.value = newTheme === 'dark';
		},
		{ immediate: true }
	);

	return { theme, isDarkMode, toggleMode };
});
