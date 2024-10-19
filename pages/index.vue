<script setup lang="ts">
	definePageMeta({
		title: '/.meta.title',
		layout: 'with-header-and-sidebar',
	});
</script>

<template>
	<ClientOnly>
		<div class="min-h-screen dark:bg-black dark:text-white">Home</div>
	</ClientOnly>
</template>
