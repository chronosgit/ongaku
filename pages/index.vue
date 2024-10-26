<script setup lang="ts">
	import TemplateLayoutPart from '~/components/utils/TemplateLayoutPart.vue';
	import PlaylistsRecent from './_components/PlaylistsRecent.vue';
	import MyTopArtists from './_components/MyTopArtists.vue';

	definePageMeta({
		title: '/.meta.title',
		layout: 'main',
	});

	useMyProfile();
</script>

<template>
	<TemplateLayoutPart class="h-full overflow-hidden px-3">
		<div class="mt-2">
			<PlaylistsRecent />
		</div>

		<div class="mt-2">
			<MyTopArtists />
		</div>
	</TemplateLayoutPart>
</template>
