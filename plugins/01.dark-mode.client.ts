export default defineNuxtPlugin((nuxt) => {
	const themeCookie = useCookie('theme', { path: '/', sameSite: 'strict' });

	const setLightMode = () => {
		themeCookie.value = 'light';

		document.documentElement.classList.remove('dark');
	};

	const setDarkMode = () => {
		themeCookie.value = 'dark';

		document.documentElement.classList.add('dark');
	};

	const toggleMode = () => {
		const currentTheme = themeCookie.value;

		if (!currentTheme) {
			setDarkMode();
			return;
		}

		if (currentTheme === 'dark') {
			setLightMode();
		} else {
			setDarkMode();
		}
	};

	const respectOSPreference = () => {
		if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			setDarkMode();
		} else {
			setLightMode();
		}
	};

	nuxt.hooks.hook('app:beforeMount', () => respectOSPreference());

	return {
		provide: {
			setLightMode,
			setDarkMode,
			toggleMode,
			respectOSPreference,
		},
	};
});
