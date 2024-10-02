<script setup>
	definePageMeta({
		title: 'home.meta.title',
	});

	const { data, error, execute } = useLazyFetch('/api/healthcheck');

	watch(data, () => console.log(data.value));
	watch(error, () => console.error(error));
</script>

<template>
	<div class="">Home</div>

	<button @click="execute()">Execute</button>
</template>
