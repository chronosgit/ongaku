import base64encode from '@/common/utils/base64encode';
import generateRandomString from '@/common/utils/generateRandomString';
import sha256 from '@/common/utils/sha256';

class AuthService {
	async #getCodeChallenge(codeVerifier) {
		const hashed = await sha256(codeVerifier);
		const codeChallenge = base64encode(hashed);

		return codeChallenge;
	}

	async #getAccessToken(code) {
		return new Promise(async (resolve, reject) => {
			try {
				// stored from requestUserAuthorization
				const codeVerifier = localStorage.getItem('code_verifier');
				const clientId = import.meta.env?.VITE_SPOTIFY_CLIENT_ID;
				const redirectUri = import.meta.env?.VITE_SPOTIFY_REDIRECT_URI;

				const payload = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					},
					body: new URLSearchParams({
						client_id: clientId,
						grant_type: 'authorization_code',
						code,
						redirect_uri: redirectUri,
						code_verifier: codeVerifier,
					}),
				};

				console.log(payload);

				const body = await fetch(
					'https://accounts.spotify.com/api/token',
					payload
				);
				const response = await body.json();

				console.log(response);

				localStorage.setItem('access_token', response.access_token);
				localStorage.setItem('refresh_token', response.refresh_token);
				resolve(response.access_token);
			} catch (err) {
				reject(err);
			}
		});
	}

	static requestUserAuthorization() {
		return new Promise(async (resolve, reject) => {
			try {
				const authService = new AuthService();

				const codeVerifier = generateRandomString(64);
				window.localStorage.setItem('code_verifier', codeVerifier);
				const codeChallenge = await authService.#getCodeChallenge(codeVerifier);

				const clientId = import.meta.env?.VITE_SPOTIFY_CLIENT_ID;
				const redirectUri = import.meta.env?.VITE_SPOTIFY_REDIRECT_URI;
				const scope = 'user-read-private user-read-email';
				const params = {
					response_type: 'code',
					client_id: clientId,
					scope,
					code_challenge_method: 'S256',
					code_challenge: codeChallenge,
					redirect_uri: redirectUri,
				};

				const authUrl = new URL('https://accounts.spotify.com/authorize');
				authUrl.search = new URLSearchParams(params).toString();

				const authWindow = window.open(
					authUrl.toString(),
					'_blank',
					`width=600,height=600`
				);

				// Listen for message event from the pop-up
				window.addEventListener('message', (event) => {
					if (event.origin === window.location.origin) {
						const { code } = event.data;

						if (code) {
							authService
								.#getAccessToken(code)
								.then((accessToken) => resolve(accessToken))
								.catch((err) => reject(err));
						} else {
							reject('No authorization code received.');
						}
					}
				});

				// Timeout to handle AFK situation
				const popupCheckInterval = setInterval(() => {
					if (authWindow.closed) {
						clearInterval(popupCheckInterval);

						reject('Authorization window was closed.');
					}
				}, 500);
			} catch (err) {
				reject(err);
			}
		});
	}

	static async refreshTokens() {
		// refresh token that has been previously stored
		const clientId = import.meta.env?.VITE_SPOTIFY_CLIENT_ID;
		const refreshToken = localStorage.getItem('refresh_token');
		const url = 'https://accounts.spotify.com/api/token';

		const payload = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: new URLSearchParams({
				grant_type: 'refresh_token',
				refresh_token: refreshToken,
				client_id: clientId,
			}),
		};

		console.log(payload);

		const body = await fetch(url, payload);
		const response = await body.json();

		console.log(response);

		localStorage.setItem('access_token', response.access_token);

		if (response.refreshToken) {
			localStorage.setItem('refresh_token', response.refresh_token);
		}
	}
}

export default AuthService;
