<script setup lang="ts">
	import Closed from './closed/index.vue';
	import { useLayoutStore } from '~/store/useLayoutStore';

	const Opened = defineAsyncComponent(() => import('./opened/index.vue'));
	const EditForm = defineAsyncComponent(
		() => import('~/components/features/playlists/edit-playlist-form/index.vue')
	);

	const layoutStore = useLayoutStore();

	const {
		followedPlaylistsAndAlbums,
		areLoading,
		fetchFollowedPlaylistsAndAlbums,
	} = useFollowedPlaylistsAndAlbums();

	const {
		isActive: isOpenEditForm,
		activate: openEditForm,
		disactivate: closeEditForm,
	} = useClickawayClient('sidebar-library-edit-playlist-form');
</script>

<template>
	<aside
		ref="library-sidebar-red"
		class="absolute z-10 m-2 w-full rounded-lg border-[1px] border-[#d3d2d2] bg-gray-100 py-4 shadow-lg transition-transform dark:border-[#252525] dark:bg-[#121212] dark:text-white"
		:class="{
			'translate-x-0': layoutStore.isLeftSideVisible,
			'-translate-x-32': !layoutStore.isLeftSideVisible,

			'max-w-80': layoutStore.isLeftSideOpen,
			'max-w-20': !layoutStore.isLeftSideOpen,
		}"
	>
		<div class="" v-if="followedPlaylistsAndAlbums">Yes</div>
		<div class="" v-else>No</div>

		<!-- <Opened
			v-if="layoutStore.isLeftSideOpen"
			:items="items"
			:is-loading="isLoading"
			:filter="filter"
			@select-only-albums="selectOnlyAlbums"
			@select-only-playlists="selectOnlyPlaylists"
			@deselect-filters="deselectFilters"
		/> -->

		<!-- v-if="!layoutStore.isLeftSideOpen" -->
		<!-- <Closed :items="items" :is-loading="isLoading" /> -->

		<!-- <Teleport to="body">
			<EditForm
				ref="sidebar-library-edit-playlist-form"
				:playlist="editablePlaylist"
				:is-visible="isOpenEditForm"
				@close-edit-playlist-form="closeEditForm()"
				@on-update-playlist="refetch()"
			/>
		</Teleport> -->
	</aside>
</template>
