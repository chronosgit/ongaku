<script setup lang="ts">
	import { useLayoutStore } from '~/store/useLayoutStore';
	import Closed from './closed/index.vue';
	import Opened from './opened/index.vue';
	import EditPlaylistForm from './edit-playlist-form/index.vue';
	import type IMediaAlbumOrPlaylist from '~/interfaces/IMediaAlbumOrPlaylist';

	const layoutStore = useLayoutStore();

	const {
		items,
		filter,
		isLoading,
		fetch,
		refetch,
		selectOnlyAlbums,
		selectOnlyPlaylists,
		deselectFilters,
		localRemoveItemById,
	} = useMyAlbumsAndPlaylists();

	const {
		isActive: isOpenEditForm,
		activate: openEditForm,
		disactivate: closeEditForm,
	} = useClickawayClient('sidebar-library-edit-playlist-form');

	const editablePlaylist = ref<IMediaAlbumOrPlaylist>({
		id: '',
		name: '',
		image: {
			height: 0,
			width: 0,
			url: '',
		},
		owner: '',
		type: 'playlist',
	});

	const editPlaylist = (playlist: IMediaAlbumOrPlaylist) => {
		if (playlist == null) return;

		editablePlaylist.value = playlist;

		openEditForm();
	};

	onMounted(() => fetch());

	provide('refetchMediaItems', refetch);
	provide('localRemoveItemById', localRemoveItemById);
	provide('editPlaylist', editPlaylist);
</script>

<template>
	<aside
		ref="library-sidebar-red"
		class="absolute z-20 m-4 w-full rounded-lg border-[1px] border-[#d3d2d2] bg-gray-100 py-4 shadow-lg transition-transform dark:border-[#252525] dark:bg-[#121212] dark:text-white"
		:class="{
			'translate-x-0': layoutStore.isLeftSideVisible,
			'-translate-x-32': !layoutStore.isLeftSideVisible,

			'max-w-80': layoutStore.isLeftSideOpen,
			'max-w-20': !layoutStore.isLeftSideOpen,
		}"
	>
		<Opened
			v-if="layoutStore.isLeftSideOpen"
			:items="items"
			:is-loading="isLoading"
			:filter="filter"
			@select-only-albums="selectOnlyAlbums"
			@select-only-playlists="selectOnlyPlaylists"
			@deselect-filters="deselectFilters"
			@refetch-media-items="refetch"
		/>

		<Closed
			v-if="!layoutStore.isLeftSideOpen"
			:items="items"
			:is-loading="isLoading"
		/>

		<Teleport to="body">
			<EditPlaylistForm
				ref="sidebar-library-edit-playlist-form"
				:playlist="editablePlaylist"
				:is-visible="isOpenEditForm"
				@close-edit-playlist-form="closeEditForm()"
				@on-update-playlist="refetch()"
			/>
		</Teleport>
	</aside>
</template>
