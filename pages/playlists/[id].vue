<script setup lang="ts">
	import LayoutPartContainer from '~/components/layout/LayoutPartContainer.vue';
	import PlaylistFeatures from './_components/PlaylistFeatures.vue';
	import SkeletonPlaylistHeader from './_components/SkeletonPlaylistHeader.vue';
	import PlaylistHeader from './_components/PlaylistHeader.vue';
	import PlaylistTracksFeed from './_components/PlaylistTracksFeed.vue';
	import { useCurrentUserStore } from '~/store/useCurrentUserStore';

	useMyProfile();

	const { t } = useI18n();
	const { params } = useRoute();

	const curUserStore = useCurrentUserStore();

	definePageMeta({ layout: 'main' });
	useHead({
		title: t('dictionary.playlist.one'),
	});

	// Playlist
	const {
		playlist,
		playlistOwnerAvatar,
		playlistDurationMs,
		isLoading,
		editPlaylistLocally,
	} = usePlaylist(params.id as string);

	// Check playlist ownership
	const isThisPlaylistMine = computed(() => {
		if (playlist.value?.owner?.id == null || curUserStore.user?.id == null) {
			return false;
		}

		return playlist.value.owner.id === curUserStore.user?.id;
	});

	// Construct page title
	watch(playlist, (p) => {
		if (p == null) return;

		const part1 = p.name;
		const part2 = t('/playlists/:id.meta.title.playlist-by');
		const part3 = p.owner.display_name;

		useHead({ title: `${part1} - ${part2} ${part3}` });
	});

	provide('editPlaylistLocally', editPlaylistLocally);
	provide('playlistId', params.id as string);
	provide('isPlaylistMine', isThisPlaylistMine);
</script>

<template>
	<LayoutPartContainer>
		<div
			id="/playlists/:id.layout-part-container"
			class="h-full overflow-y-auto rounded-lg bg-gradient-to-b scrollbar-thin scrollbar-thumb-zinc-300 scrollbar-w-4 hover:scrollbar-thumb-zinc-400 dark:from-indigo-950 dark:to-zinc-950 dark:scrollbar-thumb-zinc-700 dark:hover:scrollbar-thumb-zinc-600"
		>
			<!-- Playlist header -->
			<SkeletonPlaylistHeader v-if="isLoading" />

			<PlaylistHeader
				v-else
				:playlist="playlist"
				:playlist-owner-avatar="playlistOwnerAvatar"
				:playlist-duration-ms="playlistDurationMs"
			/>

			<!-- Play and edit buttons -->
			<PlaylistFeatures :playlist="playlist" />

			<PlaylistTracksFeed />
		</div>
	</LayoutPartContainer>
</template>
