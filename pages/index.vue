<script setup>
	import AuthService from '~/services/AuthService';

	definePageMeta({
		title: 'home.meta.title',
	});

	const { data, error, execute } = useLazyAsyncData('oauth-request-uri', () => {
		return AuthService.requestOAuthUri();
	});

	watch(data, () => console.log(data.value));
	watch(error, () => console.error(error.value));
</script>

<template>
	<div class="mb-3">Home</div>

	<button class="px-4 py-2 border-[1px] rounded-lg" @click="execute()">
		Request OAuth URI
	</button>
</template>
