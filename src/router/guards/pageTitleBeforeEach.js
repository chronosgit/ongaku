import { i18n } from '@/main';

const pageTitleBeforeEach = (to, from, next) => {
	const defaultTitle = 'Ongaku - Web Player. Music for everyone.';
	const titleKey = to.meta.title;

	if (i18n.global.te(titleKey)) {
		document.title = i18n.global.t(titleKey);
	} else {
		document.title = defaultTitle;
	}

	next();
};

export default pageTitleBeforeEach;
