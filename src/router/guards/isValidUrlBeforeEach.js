import { i18n } from '@/main';
import { SUPPORTED_LOCALES } from '@/localization/i18n';

const isValidUrlBeforeEach = (to, from, next) => {
	const firstPathPart = to.path.split('/')[1];
	const activeLocal = i18n.global.locale.value;

	if (
		firstPathPart === 'spotify' ||
		SUPPORTED_LOCALES.includes(firstPathPart)
	) {
		next();
	} else {
		next(`/${activeLocal}/not-found`);
	}
};

export default isValidUrlBeforeEach;
