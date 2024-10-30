<script setup lang="ts">
	const playlistId = inject<string>('playlistId', '');

	const { playlistTracks, areLoading, refetchPlaylistTracks, isTrack } =
		usePlaylistTracks(playlistId);
</script>

<template>Tracks</template>
