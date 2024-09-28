<script setup>
	import AuthService from '@/services/AuthService';
	import PlaylistsService from '@/services/UnF_PlaylistsService';

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
		PlaylistsService.getPlaylistCoverImage(
			'3ZmhKwo2M7Piy7L88mgyWf',
			'/9j/2wCEABoZGSccJz4lJT5CLy8vQkc9Ozs9R0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0cBHCcnMyYzPSYmPUc9Mj1HR0dEREdHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR//dAAQAAf/uAA5BZG9iZQBkwAAAAAH/wAARCAABAAEDACIAAREBAhEB/8QASwABAQAAAAAAAAAAAAAAAAAAAAYBAQAAAAAAAAAAAAAAAAAAAAAQAQAAAAAAAAAAAAAAAAAAAAARAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwAAARECEQA/AJgAH//Z'
		)
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
