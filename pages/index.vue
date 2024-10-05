<script setup>
	import AuthService from '~/services/AuthService';

	definePageMeta({
		title: 'home.meta.title',
	});

	const { data, error, execute } = useLazyAsyncData(
		'fetch',
		() =>
			$fetch('/api/playlists/5mDqrrSnZvaBbNhCOO8kfK/tracks', {
				method: 'PUT',
				body: { rangeStart: 0, rangeLength: 2, insertBefore: 5 },
			}),
		{ immediate: false }
	);

	watch(data, () => console.log(data?.value));
	watch(error, () => console.error(error?.value));
</script>

<template>
	<div class="mb-3">Home</div>

	<div class="my-4">
		<button
			class="p-2 border-[1px] rounded-lg"
			@click="AuthService.initOAuth()"
		>
			Request OAuth URI
		</button>

		<button
			class="p-2 border-[1px] rounded-lg"
			@click="AuthService.refreshTokens()"
		>
			Refresh tokens
		</button>

		<button class="p-2 border-[1px] rounded-lg" @click="execute()">
			Use service
		</button>
	</div>
</template>
