import AuthService from '~/services/AuthService';

export default function () {
	const { locale } = useI18n();

	const authenticate = async () => {
		try {
			await AuthService.initOAuth();

			console.log('Authenticated');

			await navigateTo(`/${locale.value}`);
		} catch (err) {
			console.error(err);
		}
	};

	return { authenticate };
}
