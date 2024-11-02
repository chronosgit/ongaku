<script setup lang="ts">
	import TracksFeed from '~/components/features/tracks/tracks-feed/index.vue';
	import type IPlaylistObject from '~/interfaces/business/playlists/IPlaylistObject';
	import type ITrackFeedItem from '~/interfaces/business/tracks/ITrackFeedItem';

	const { params } = useRoute();

	const isPlaylistMine = inject<ComputedRef<boolean>>(
		'isPlaylistMine',
		computed(() => false)
	);

	const { playlistTracks, areLoading, isTrack } = usePlaylistTracks(
		params.id as string
	);

	const trackFeedItems = computed(() => {
		if (playlistTracks.value == null) return null;

		const items = playlistTracks.value
			.map<ITrackFeedItem | null>((i) => {
				// Denying episodes
				if (i == null || !isTrack(i.track)) return null;

				return convertPlaylistTrackObjectToTrackFeedItem(
					params.id as string,
					i,
					i.track,
					isPlaylistMine.value
				);
			})
			.filter((i) => i != null);

		return items;
	});
</script>

<template>
	<div class="mt-8 overflow-y-auto px-4">
		<TracksFeed
			:tracks="trackFeedItems"
			:are-tracks-loading="areLoading"
			:skeleton-items-total="8"
		/>
	</div>
</template>
