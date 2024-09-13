import { nextTick, ref } from 'vue';
import { createI18n } from 'vue-i18n';

const SUPPORTED_LOCALES = ['en', 'ru'];
const DEFAULT_LOCALE = 'en';

const setupI18n = (possibleInitLocale) => {
	const validInitLocale = SUPPORTED_LOCALES.includes(possibleInitLocale)
		? possibleInitLocale
		: DEFAULT_LOCALE;

	const options = {
		locale: validInitLocale,
		fallbackLocale: validInitLocale,
		legacy: false,
		messages: {},
	};

	const i18n = createI18n(options);

	return i18n;
};

// updates language (dependent on redirection, because it's called in trackLocaleBeforeEach)
const loadLocaleMessages = async (i18n, locale) => {
	try {
		const messages = await import(`./locales/${locale}.json`);

		// axios.defaults.headers.common['Accept-Language'] = locale
		document.querySelector('html').setAttribute('lang', locale);
		i18n.global.setLocaleMessage(locale, messages.default);
		i18n.global.locale.value = locale;

		return nextTick();
	} catch (error) {
		console.error(`Failed to load messages for locale: ${locale}`, error);
	}
};

export { SUPPORTED_LOCALES, DEFAULT_LOCALE, setupI18n, loadLocaleMessages };
