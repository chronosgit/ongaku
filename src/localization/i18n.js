import { nextTick } from 'vue';
import { createI18n } from 'vue-i18n';

export const SUPPORTED_LOCALES = ['en', 'ru'];
export const DEFAULT_LOCALE = 'en';

export const setupI18n = (initialLocale) => {
	const validInitLocale = SUPPORTED_LOCALES.includes(initialLocale)
		? initialLocale
		: 'en';

	const options = {
		locale: validInitLocale,
		fallbackLocale: 'en',
		legacy: false,
	};

	const i18n = createI18n(options);

	setI18nLanguage(i18n, options.locale);

	// initial load
	loadLocaleMessages(i18n, options.locale);

	return i18n;
};

export const setI18nLanguage = (i18n, locale) => {
	if (i18n.mode === 'legacy') {
		i18n.global.locale = locale;
	} else {
		i18n.global.locale.value = locale;
	}

	// axios.defaults.headers.common['Accept-Language'] = locale
	document.querySelector('html').setAttribute('lang', locale);
};

export const loadLocaleMessages = async (i18n, locale) => {
	let messages = await import(`./locales/${locale}.json`);

	// set locale and locale message
	i18n.global.setLocaleMessage(locale, messages.default);

	return nextTick();
};
