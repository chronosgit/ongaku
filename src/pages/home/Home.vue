<script setup>
	import AlbumService from '@/services/AlbumService';
	import AuthService from '@/services/AuthService';

	const onAuthBtnClick = () => {
		AuthService.requestUserAuthorization()
			.then((res) => console.log('Auth response: ', res))
			.catch((err) => console.error('Auth error: ', err));
	};

	const onRefreshTokenBtnClick = () => {
		AuthService.refreshTokens()
			.then((res) => console.log('Refresh response: ', res))
			.catch((err) => console.error('Refresh error: ', err));
	};

	const onTestBtnClick = () => {
		AlbumService.getNewAlbumReleases()
			.then((res) => console.log(res))
			.catch((err) => console.error(err));
	};
</script>

<template>
	<section class="home">
		<h2>Home</h2>

		<button @click="onAuthBtnClick">Authorize</button>
		<button @click="onRefreshTokenBtnClick">Refresh tokens</button>
		<button @click="onTestBtnClick">Test</button>
	</section>
</template>
