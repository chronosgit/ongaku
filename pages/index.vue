<script setup lang="ts">
	import LayoutPartTemplate from '~/components/organisms/LayoutPartTemplate.vue';

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
