export default defineNuxtPlugin((nuxt) => {
	nuxt.provide('switchLocale', () => {
		const i18n = nuxt.$i18n as
			| {
					locale: ComputedRef<string>;
					availableLocales: string[];
					setLocale: (locale: string) => void;
			  }
			| undefined;

		if (i18n == null) return;

		const indexOfCurLocale = i18n.availableLocales.findIndex(
			(l) => l === i18n.locale.value
		);

		const nextLocaleIndex =
			indexOfCurLocale + 1 < i18n.availableLocales.length
				? indexOfCurLocale + 1
				: 0;

		i18n.setLocale(i18n.availableLocales[nextLocaleIndex]);
	});
});
