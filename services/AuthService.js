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
		const { codeChallenge, codeVerifier } = await as.#doPkce();

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
		const authWindow = window.open(
			authUrl.toString(),
			'_blank',
			`width=400,height=400`
		);

		window.localStorage.setItem('code_verifier', codeVerifier);

		// Waiting for message from opened new window
		window.addEventListener('message', (event) => {
			if (event.origin !== window.location.origin) return;

			const { code } = event.data;

			if (!code) return;

			as.#requestAccessToken(code);
		});

		// Time-to-time window check
		const popupCheckInterval = setInterval(() => {
			if (authWindow?.closed) {
				clearInterval(popupCheckInterval);

				console.log('Authorization window was closed');
			}
		}, 2000);
	}

	async #requestAccessToken(code) {
		try {
			const codeVerifier = localStorage.getItem('code_verifier');

			// Let the server get tokens and send them back as secure cookies
			return await $fetch('/api/auth/tokens', {
				method: 'POST',
				body: { code, codeVerifier },
			});
		} catch (err) {
			console.error(err);
		}
	}

	async #doPkce() {
		const codeVerifier = generateRandomString(64);
		const hashed = await sha256(codeVerifier);
		const codeChallenge = base64Encode(hashed);

		return { codeChallenge, codeVerifier };
	}

	#getAuthScope() {
		const scopes = [
			'user-read-private',
			'user-read-email',
			'user-library-read',
			'user-library-modify',
			'playlist-modify-public',
			'playlist-modify-private',
			'ugc-image-upload',
		];

		return scopes.join(' ');
	}

	static async refreshTokens() {
		$fetch('/api/auth/refresh', { method: 'POST' });
	}
}
export default AuthService;
