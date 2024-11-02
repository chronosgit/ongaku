<script setup lang="ts">
	import { IconCheck, IconPlus } from '~/components/ui/icons';
	import PlaylistsService from '~/services/PlaylistsService';

	const { params } = useRoute();
	const playlistId = params.id as string;

	const isPlaylistFollowed = ref<boolean | null>(null);

	// Check if current user already follows
	watch(
		() => playlistId,
		async (id) => {
			const condArr = await PlaylistsService.checkIfCurUserFollowsPlaylist(id);

			isPlaylistFollowed.value = Array.isArray(condArr) && condArr[0];

			console.log(isPlaylistFollowed.value);
		},
		{ immediate: true, once: true }
	);
</script>

<template>
	<ClientOnly v-if="isPlaylistFollowed === true">
		<IconCheck />
	</ClientOnly>

	<ClientOnly v-if="isPlaylistFollowed === false">
		<IconPlus />
	</ClientOnly>
</template>
