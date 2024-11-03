<script setup lang="ts">
	import { IconPlay } from '~/components/ui/icons';
	import type IPlaylistObject from '~/interfaces/business/playlists/IPlaylistObject';

	const playlist = inject<Ref<IPlaylistObject | null>>('playlist', ref(null));
</script>

<template>
	<div
		role="button"
		class="flex cursor-pointer items-center justify-center rounded-full bg-indigo-400 p-4 transition-all hover:scale-105 hover:bg-indigo-500"
		@click="console.log(`Play ${playlist?.name}`)"
	>
		<ClientOnly><IconPlay class="scale-[200%]" /></ClientOnly>
	</div>
</template>
