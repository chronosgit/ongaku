class AuthService {
	static async initOAuth() {
		if (!import.meta.client) {
			console.error('OAuth request must be initiated on the client.');
			return;
		}

		const as = new AuthService();

		const {
			public: { spotifyAuthClientId, spotifyAuthRedirectUri },
		} = useRuntimeConfig();
		const scope = as.#getAuthScope();
		const codeChallenge = await as.#getCodeChallenge();

		const params = {
			response_type: 'code',
			client_id: spotifyAuthClientId,
			scope,
			code_challenge_method: 'S256',
			code_challenge: codeChallenge,
			redirect_uri: spotifyAuthRedirectUri,
		};

		window.localStorage.setItem('code_verifier', codeVerifier);

		const authUrl = new URL('https://accounts.spotify.com/authorize');
		authUrl.search = new URLSearchParams(params).toString();

		const authWindow = window.open(
			authUrl.toString(),
			'_blank',
			`width=400,height=400`
		);

		window.addEventListener('message', (event) => {
			if (event.origin !== window.location.origin) return;

			const { code } = event.data;

			if (!code) return;

			as.#requestAccessToken(code);
		});

		const popupCheckInterval = setInterval(() => {
			if (authWindow.closed) {
				clearInterval(popupCheckInterval);

				console.log('Authorization window was closed');
			}
		}, 2000);
	}

	async #requestAccessToken(code) {
		const {
			public: { spotifyAuthClientId, spotifyAuthRedirectUri },
		} = useRuntimeConfig();

		const codeVerifier = localStorage.getItem('code_verifier');

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

		const body = await fetch('https://accounts.spotify.com/api/token', payload);
		const response = await body.json();

		console.log(response);

		// TODO: sent to server -> server returns secure cookies
	}

	async #getCodeChallenge() {
		const codeVerifier = generateRandomString(64);
		const hashed = await sha256(codeVerifier);
		const codeChallenge = base64Encode(hashed);

		return codeChallenge;
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

	// static async refreshTokens() {
	// 	// refresh token that has been previously stored
	// 	const clientId = import.meta.env?.VITE_SPOTIFY_CLIENT_ID;
	// 	const refreshToken = localStorage.getItem('refresh_token');
	// 	const url = 'https://accounts.spotify.com/api/token';
	// 	const payload = {
	// 		method: 'POST',
	// 		headers: {
	// 			'Content-Type': 'application/x-www-form-urlencoded',
	// 		},
	// 		body: new URLSearchParams({
	// 			grant_type: 'refresh_token',
	// 			refresh_token: refreshToken,
	// 			client_id: clientId,
	// 		}),
	// 	};
	// 	console.log(payload);
	// 	const body = await fetch(url, payload);
	// 	const response = await body.json();
	// 	console.log(response);
	// 	localStorage.setItem('access_token', response.access_token);
	// 	if (response.refreshToken) {
	// 		localStorage.setItem('refresh_token', response.refresh_token);
	// 	}
	// }
}
export default AuthService;
