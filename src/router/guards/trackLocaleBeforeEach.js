import { i18n } from '@/main';
import { loadLocaleMessages, setI18nLanguage } from '@/localization/i18n';

const trackLocaleBeforeEach = async (to, _, next) => {
	const locale = to.params.locale;

	// load locale messages
	if (!i18n.global.availableLocales.includes(locale)) {
		await loadLocaleMessages(i18n, locale);
	}

	// set i18n language
	setI18nLanguage(i18n, locale);

	return next();
};

export default trackLocaleBeforeEach;
