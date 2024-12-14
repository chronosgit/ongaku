<script setup lang="ts">
	import { IconPlay } from '~/components/ui/icons';
	import type IPlaylistObject from '~/interfaces/business/playlists/IPlaylistObject';
	import PlayerService from '~/services/PlayerService';

	const playlist = inject<Ref<IPlaylistObject | null>>('playlist', ref(null));

	const play = () => {
		const id = playlist.value?.id;
		if (id == null) return;

		PlayerService.startOrResumePlayback(`spotify:playlist:${id}`);
	};
</script>

<template>
	<div
		role="button"
		class="flex cursor-pointer items-center justify-center rounded-full bg-indigo-400 p-4 transition-all hover:scale-105 hover:bg-indigo-500"
		@click="play"
	>
		<ClientOnly><IconPlay class="scale-[200%]" /></ClientOnly>
	</div>
</template>
