<script setup lang="ts">
	import PlaylistsRecent from './_components/PlaylistsRecent.vue';
	import TemplateLayoutPart from '~/components/utils/TemplateLayoutPart.vue';

	definePageMeta({
		title: '/.meta.title',
		layout: 'main',
	});

	useMyProfile();
</script>

<template>
	<TemplateLayoutPart class="h-full">
		<div class="p-2">
			<PlaylistsRecent />
		</div>
	</TemplateLayoutPart>
</template>
