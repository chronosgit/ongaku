export default defineNuxtPlugin(async () => {
	const { data: accessToken } = await $fetch('/exp-token');

	const script = document.createElement('script');
	script.src = 'https://sdk.scdn.co/spotify-player.js';
	script.onload = true;
	document.head.appendChild(script);

	const playerReadyPromise = new Promise((resolve) => {
		window.onSpotifyWebPlaybackSDKReady = () => {
			const player = new window.Spotify.Player({
				name: 'Nuxt Web Playback SDK',
				getOAuthToken: (cb) => {
					cb(accessToken);
				},
				volume: 0.5,
				robustnessLevel: 'medium',
			});

			player.addListener('ready', ({ device_id }) => {
				console.log('Spotify Player is ready with Device ID:', device_id);

				resolve(device_id);
			});

			player.addListener('not_ready', ({ device_id }) => {
				console.log('Spotify Player has gone offline:', device_id);
			});

			player.addListener('initialization_error', ({ message }) => {
				console.error(message);
			});

			player.addListener('authentication_error', ({ message }) => {
				console.error(message);
			});

			player.addListener('account_error', ({ message }) => {
				console.error(message);
			});

			player.connect().then((success) => {
				if (success) {
					console.log('Spotify Player connected successfully');
				}
			});
		};
	});

	return {
		provide: {
			spotifyPlayer: playerReadyPromise,
		},
	};
});
