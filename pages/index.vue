<script setup>
	import AuthService from '~/services/AuthService';

	definePageMeta({
		title: 'home.meta.title',
	});

	const { data, error, execute } = useLazyAsyncData(
		'fetch',
		() =>
			$fetch('/api/playlists/3cEYpjA9oz9GiPac4AsH4n/followers', {
				method: 'PUT',
				body: { public: false },
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
