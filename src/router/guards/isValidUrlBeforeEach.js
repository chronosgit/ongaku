import { i18n } from '@/main';
import { SUPPORTED_LOCALES } from '@/localization/i18n';

const isValidUrlBeforeEach = (to, from, next) => {
	const lang = to.path.split('/')[1];
	const activeLocal = i18n.global.locale.value;

	if (SUPPORTED_LOCALES.includes(lang)) {
		next();
	} else {
		next(`/${activeLocal}/not-found`);
	}
};

export default isValidUrlBeforeEach;
