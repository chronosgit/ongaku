export default defineNuxtPlugin(async () => {
	let playerReadyPromise;

	const script = document.createElement('script');
	script.src = 'https://sdk.scdn.co/spotify-player.js';
	script.async = true;
	document.head.appendChild(script);

	const { data: accessToken } = await $fetch('/exp-token');

	playerReadyPromise = new Promise((resolve) => {
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

				resolve(player);
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
