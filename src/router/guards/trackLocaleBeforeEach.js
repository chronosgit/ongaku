import { i18n } from '@/main';
import { loadLocaleMessages } from '@/localization/i18n';

const trackLocaleBeforeEach = async (to, _, next) => {
	const locale = to.params.locale;

	// load locale messages
	if (!i18n.global.availableLocales.includes(locale)) {
		console.log(`Initiating the loading of ${locale}`);
		await loadLocaleMessages(i18n, locale);
	}

	return next();
};

export default trackLocaleBeforeEach;
