import AuthService from '~/services/AuthService';

export default function () {
	const authenticate = async () => {
		try {
			const res = await AuthService.initOAuth();

			console.log(res);
		} catch (err) {
			console.error(err);
		}
	};

	return { authenticate };
}
