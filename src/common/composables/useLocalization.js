import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { SUPPORTED_LOCALES } from '@/localization/i18n';
import getFullPathWithNewLocale from '../utils/getFullPathWithNewLocale';

const useLocalization = () => {
	const router = useRouter();
	const route = useRoute();

	const { t, locale } = useI18n();

	const onLocaleChange = (possibleNewLocale) => {
		if (!SUPPORTED_LOCALES.includes(possibleNewLocale)) {
			console.error('Such locale is not supported');
			return;
		}

		const redirectPath = getFullPathWithNewLocale(
			route.fullPath,
			possibleNewLocale
		);

		locale.value = possibleNewLocale;
		router.push(redirectPath);
	};

	return {
		t,
		supportedLocales: SUPPORTED_LOCALES,
		onLocaleChange,
	};
};

export default useLocalization;
