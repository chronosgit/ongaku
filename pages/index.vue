<script setup lang="ts">
	import LayoutPartContainer from '~/components/layout/LayoutPartContainer.vue';
	import PlaylistsRecent from './_components/PlaylistsRecent.vue';
	import MyTopArtists from './_components/MyTopArtists.vue';

	definePageMeta({
		title: '/.meta.title',
		layout: 'main',
	});

	useMyProfile();
</script>

<template>
	<LayoutPartContainer class="h-full overflow-hidden px-3">
		<div class="mt-2"><PlaylistsRecent /></div>

		<div class="mt-2"><MyTopArtists /></div>
	</LayoutPartContainer>
</template>
