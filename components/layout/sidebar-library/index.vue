<script setup lang="ts">
	import Closed from './closed/index.vue';
	import { useLayoutStore } from '~/store/useLayoutStore';
	import makeMediaItems from './utils/makeMediaItems';

	const Opened = defineAsyncComponent(() => import('./opened/index.vue'));

	const layoutStore = useLayoutStore();

	const {
		followedPlaylistsAndAlbums,
		areLoading,
		refetchFollowedPlaylistsAndAlbums,
		extendMediaItems,
		editPlaylistLocally,
		removePlaylistLocally,
	} = useFollowedPlaylistsAndAlbums();

	const mediaItems = computed(() => {
		if (followedPlaylistsAndAlbums.value == null) return [];

		return makeMediaItems(followedPlaylistsAndAlbums.value);
	});

	provide('mediaItems', mediaItems);
	provide('areMediaItemsLoading', areLoading);
	provide('fetchMediaItems', refetchFollowedPlaylistsAndAlbums);
	provide('extendMediaItems', extendMediaItems);
	provide('editPlaylistLocally', editPlaylistLocally);
	provide('removePlaylistLocally', removePlaylistLocally);
</script>

<template>
	<aside
		ref="library-sidebar-red"
		class="absolute z-10 m-2 w-full rounded-lg border-[1px] border-[#d3d2d2] bg-gray-100 py-4 shadow-lg dark:border-[#252525] dark:bg-[#121212] dark:text-white"
		:class="{
			'translate-x-0': layoutStore.isLeftSideVisible,
			'-translate-x-32': !layoutStore.isLeftSideVisible,

			'max-w-80': layoutStore.isLeftSideOpen,
			'max-w-20': !layoutStore.isLeftSideOpen,
		}"
	>
		<Opened v-if="layoutStore.isLeftSideOpen" />

		<Closed v-else />
	</aside>
</template>
