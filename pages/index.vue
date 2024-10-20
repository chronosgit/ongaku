<script setup lang="ts">
	definePageMeta({
		title: '/.meta.title',
		layout: 'with-header-and-sidebar',
	});

	useMyProfile();
</script>

<template>
	<div class="min-h-screen dark:bg-black dark:text-white">Home</div>
</template>
