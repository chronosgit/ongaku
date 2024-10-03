class AuthService {
	static async requestOAuth() {
		try {
			if (!import.meta.client) {
				console.error('OAuth request must originate from client.');
				return;
			}

			const as = new AuthService();

			const codeVerifier = as.#generateRandomString(64);
			const hashed = await as.#sha256(codeVerifier);
			const codeChallenge = as.#base64Encode(hashed);

			window.localStorage.getItem('code_verifier', codeVerifier);

			const {
				public: { spotifyAuthClientId, spotifyAuthRedirectUri },
			} = useRuntimeConfig();
			const scope = as.#getAuthScope();
			const params = {
				response_type: 'code',
				client_id: spotifyAuthClientId,
				scope,
				code_challenge_method: 'S256',
				code_challenge: codeChallenge,
				redirect_uri: spotifyAuthRedirectUri,
			};

			const authUrl = new URL('https://accounts.spotify.com/authorize');
			authUrl.search = new URLSearchParams(params).toString();

			const authWindow = window.open(authUrl, '_blank', `width=500,height=500`);

			window.addEventListener('message', (event) => {
				if (event.origin !== window.location.origin) return;
				if (!event.data.code) return;

				as.#getAccessToken(event.data.code).then((res) => console.log(res));
			});

			const popupCheckInterval = setInterval(() => {
				if (!authWindow.closed) return;

				console.log('Authorization window was closed.');
				clearInterval(popupCheckInterval);
			}, 2000);
		} catch (err) {
			console.error(err);
		}
	}

	async #getAccessToken(code) {
		try {
			const codeVerifier = localStorage.getItem('code_verifier');

			const { public: spotifyAuthClientId, spotifyAuthRedirectUri } =
				useRuntimeConfig();

			const payload = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: new URLSearchParams({
					client_id: spotifyAuthClientId,
					grant_type: 'authorization_code',
					code,
					redirect_uri: spotifyAuthRedirectUri,
					code_verifier: codeVerifier,
				}),
			};

			return await $fetch('https://accounts.spotify.com/api/token', payload);
		} catch (err) {
			reject(err);
		}
	}

	#getAuthScope() {
		const scopes = [
			'user-read-private',
			'user-read-email',
			'user-library-read',
			'user-library-modify',
		];

		return scopes.join(' ');
	}

	#generateRandomString(length) {
		const possible =
			'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		const values = crypto.getRandomValues(new Uint8Array(length));

		return values.reduce((acc, x) => acc + possible[x % possible.length], '');
	}

	async #sha256(plain) {
		const encoder = new TextEncoder();
		const data = encoder.encode(plain);

		return window.crypto.subtle.digest('SHA-256', data);
	}

	#base64Encode(input) {
		return btoa(String.fromCharCode(...new Uint8Array(input)))
			.replace(/=/g, '')
			.replace(/\+/g, '-')
			.replace(/\//g, '_');
	}
}

export default AuthService;
