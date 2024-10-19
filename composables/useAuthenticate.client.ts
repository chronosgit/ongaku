import AuthService from '~/services/AuthService';

export default function () {
	const authenticate = async () => {
		try {
			await AuthService.initOAuth();
		} catch (err) {
			console.error(err);
		}
	};

	return { authenticate };
}
