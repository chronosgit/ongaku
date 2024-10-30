<script setup lang="ts">
	import LayoutPartContainer from '~/components/layout/LayoutPartContainer.vue';
	import PlaylistFeatures from './_components/PlaylistFeatures.vue';
	import SkeletonPlaylistHeader from './_components/SkeletonPlaylistHeader.vue';
	import PlaylistHeader from './_components/PlaylistHeader.vue';

	useMyProfile();

	const { t } = useI18n();

	definePageMeta({ layout: 'main' });
	useHead({
		title: t('dictionary.playlist.one'),
	});

	const { params } = useRoute();

	const {
		playlist,
		playlistOwnerAvatar,
		playlistDurationMs,
		isLoading,
		editPlaylistLocally,
	} = usePlaylist(params.id as string);

	// Construct page title
	watch(playlist, (p) => {
		if (p == null) return;

		const part1 = p.name;
		const part2 = t('/playlists/:id.meta.title.playlist-by');
		const part3 = p.owner.display_name;

		useHead({ title: `${part1} - ${part2} ${part3}` });
	});

	provide('editPlaylistLocally', editPlaylistLocally);
</script>

<template>
	<LayoutPartContainer class="h-full">
		<div
			class="bg-gradient-to-b dark:from-indigo-950 dark:via-indigo-950 dark:to-zinc-950"
		>
			<!-- Playlist header -->
			<SkeletonPlaylistHeader v-if="isLoading" />

			<PlaylistHeader
				v-else
				:playlist="playlist"
				:playlist-owner-avatar="playlistOwnerAvatar"
				:playlist-duration-ms="playlistDurationMs"
			/>

			<!-- Play and edit (if own) button -->
			<PlaylistFeatures :playlist="playlist" />

			<!-- Etc -->
		</div>
	</LayoutPartContainer>
</template>
