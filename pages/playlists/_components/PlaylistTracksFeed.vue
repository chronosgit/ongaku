<script setup lang="ts">
	import TrackFeed from '~/components/features/tracks/tracks-feed/index.vue';
	import type ITrackFeedItem from '~/interfaces/business/tracks/ITrackFeedItem';

	const playlistId = inject<string>('playlistId', '');

	const { playlistTracks, areLoading, refetchPlaylistTracks, isTrack } =
		usePlaylistTracks(playlistId);

	const trackFeedItems = computed(() => {
		if (playlistTracks.value == null) return null;

		const items = playlistTracks.value
			.map<ITrackFeedItem | null>((i) => {
				// Denying episodes
				if (!isTrack(i.track)) return null;

				return convertPlaylistTrackObjectToTrackFeedItem(
					playlistId,
					i,
					i.track
				);
			})
			.filter((i) => i != null);

		return items;
	});
</script>

<template>
	<div class="mt-8 h-full overflow-hidden px-4">
		<TrackFeed
			:tracks="trackFeedItems"
			:are-tracks-loading="areLoading"
			:skeleton-items-total="8"
		/>
	</div>
</template>
