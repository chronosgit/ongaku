<script setup>
	import AuthService from '@/services/AuthService';
	import MarketsService from '@/services/MarketsService';

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
		MarketsService.getAvailableMarkets()
			.then((res) => console.log(res))
			.catch((err) => console.error(err));
	};
</script>

<template>
	<section class="home">
		<h2 class="text-blue-400">Home</h2>

		<div class="space-x-4">
			<button
				class="px-2 border-2 rounded-full border-gray-300 transition-colors hover:bg-black hover:text-white hover:border-black"
				@click="onAuthBtnClick"
			>
				Authorize
			</button>
			<button
				class="px-2 border-2 rounded-full border-gray-300 transition-colors hover:bg-black hover:text-white hover:border-black"
				@click="onRefreshTokenBtnClick"
			>
				Refresh tokens
			</button>
			<button
				class="px-2 border-2 rounded-full border-gray-300 transition-colors hover:bg-black hover:text-white hover:border-black"
				@click="onTestBtnClick"
			>
				Test
			</button>
		</div>
	</section>
</template>
