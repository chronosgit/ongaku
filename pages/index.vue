<script setup lang="ts">
	import TemplateLayoutPart from '~/components/utils/TemplateLayoutPart.vue';

	definePageMeta({
		title: '/.meta.title',
		layout: 'main',
	});

	useMyProfile();
</script>

<template>
	<TemplateLayoutPart class="h-full">
		<div class="p-2 dark:text-white">Home</div>
	</TemplateLayoutPart>
</template>
