<script setup>
	import AuthService from '~/services/AuthService';

	definePageMeta({
		title: 'home.meta.title',
	});
</script>

<template>
	<div class="mb-3">Home</div>

	<button
		class="px-4 py-2 border-[1px] rounded-lg"
		@click="AuthService.requestOAuth()"
	>
		Request OAuth URI
	</button>
</template>
