<script setup lang="ts">
	import LayoutPartTemplate from '~/components/templates/LayoutPartTemplate.vue';

	definePageMeta({
		title: '/.meta.title',
		layout: 'main',
	});

	useMyProfile();
</script>

<template>
	<LayoutPartTemplate class="h-full">
		<div class="p-2 dark:text-white">Home</div>
	</LayoutPartTemplate>
</template>
