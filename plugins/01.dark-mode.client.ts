export default defineNuxtPlugin((nuxt) => {
	const setLightMode = () => {
		localStorage.theme = 'light';

		document.documentElement.classList.remove('dark');
	};

	const setDarkMode = () => {
		localStorage.theme = 'dark';

		document.documentElement.classList.add('dark');
	};

	const toggleMode = () => {
		document.documentElement.classList.toggle('dark');
	};

	const respectOSPreference = () => {
		localStorage.removeItem('theme');

		document.documentElement.classList.toggle(
			'dark',
			window.matchMedia('(prefers-color-scheme: dark)').matches
		);
	};

	nuxt.hooks.hook('app:created', () => {
		document.documentElement.classList.toggle(
			'dark',
			localStorage.theme === 'dark' ||
				(!('theme' in localStorage) &&
					window.matchMedia('(prefers-color-scheme: dark)').matches)
		);
	});

	return {
		provide: {
			setLightMode,
			setDarkMode,
			toggleMode,
			respectOSPreference,
		},
	};
});
