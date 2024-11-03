<script setup lang="ts">
	import FollowFeature from './components/follow-feature/index.vue';
	import PlayPlaylist from './components/play-feature/index.vue';
	import MyPlaylistFeatures from './components/my-playlist-features/index.vue';
	import type IPlaylistObject from '~/interfaces/business/playlists/IPlaylistObject';

	const EditPlaylistForm = defineAsyncComponent(
		() => import('~/components/features/playlists/edit-playlist-form/index.vue')
	);

	const editPlaylistLocally = inject<
		(playlistId: string, newName: string, newDescr: string) => void
	>('editPlaylistLocally', () => {});

	const props = defineProps<{ playlist: IPlaylistObject | null }>();

	const {
		isActive: isEditForm,
		activate: openEditForm,
		disactivate: closeEditForm,
	} = useClickawayClient(`/playlists/${props.playlist?.id}.edit-playlist-form`);

	const playlistCoverImage = computed(() => {
		if (!Array.isArray(props.playlist?.images) || !props.playlist.images.length)
			return null;

		return props.playlist.images[0];
	});

	const onEditSuccess = (
		playlistId: string,
		newName: string,
		newDescr: string
	) => {
		editPlaylistLocally(playlistId, newName, newDescr);
		closeEditForm();
	};

	provide('openEditForm', openEditForm);
</script>

<template>
	<div
		v-if="props.playlist"
		class="relative flex items-center justify-between gap-4 px-4"
	>
		<PlayPlaylist />

		<div class="flex items-center gap-2">
			<!-- If I own the playlist -->
			<MyPlaylistFeatures />

			<FollowFeature />
		</div>

		<!-- Absolute form -->
		<EditPlaylistForm
			:ref="`/playlists/${props.playlist?.id}.edit-playlist-form`"
			:is-visible="isEditForm"
			:id="props.playlist.id"
			:name="props.playlist.name"
			:descr="props.playlist.description"
			:image="playlistCoverImage"
			@close-form="closeEditForm"
			@on-edit-success="onEditSuccess"
		/>
	</div>
</template>
