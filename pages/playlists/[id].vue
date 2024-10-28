<script setup lang="ts">
	import TemplateLayoutPart from '~/_migration/shared/LayoutPartContainer.vue';
	import PlaylistHeader from './_components/PlaylistHeader.vue';
	import SkeletonPlaylistHeader from './_components/SkeletonPlaylistHeader.vue';
	import PlaylistFeatures from './_components/PlaylistFeatures.vue';

	useMyProfile();

	const { t } = useI18n();

	definePageMeta({ layout: 'main' });
	useHead({
		title: t('dictionary.playlist.one'),
	});

	const { params } = useRoute();

	const {
		playlist,
		playlistOwnerAvatarUrl,
		playlistLengthMs,
		isLoading: isPlaylistLoading,
		fetchPlaylist,
	} = usePlaylist(params.id as string);

	// Construct page title
	watch(playlist, (p) => {
		if (p == null) return;

		const part1 = p.name;
		const part2 = t('/playlists/:id.meta.title.playlist-by');
		const part3 = p.owner.display_name;

		useHead({ title: `${part1} - ${part2} ${part3}` });
	});

	onMounted(() => fetchPlaylist());
</script>

<template>
	<TemplateLayoutPart class="h-full">
		<div
			class="bg-gradient-to-b from-cyan-100 via-cyan-100 to-[#f3f4f6] dark:from-indigo-950 dark:via-indigo-950 dark:to-[#121212]"
		>
			<!-- Playlist header -->
			<SkeletonPlaylistHeader v-if="isPlaylistLoading" />
			<PlaylistHeader
				v-else
				:playlist="playlist"
				:playlist-owner-avatar="playlistOwnerAvatarUrl"
				:playlist-length-ms="playlistLengthMs"
			/>

			<!-- Play and edit (if own) button -->
			<PlaylistFeatures :playlist="playlist" />

			<!-- Etc -->
		</div>
	</TemplateLayoutPart>
</template>
