<script setup lang="ts">
	import type IPlaylist from '~/interfaces/IPlaylist';
	import PlaylistTooltip from './PlaylistTooltip.vue';

	const props = defineProps<{ playlists: IPlaylist[] }>();

	const onPlaylistClick = (playlist: IPlaylist) => console.log(playlist);
</script>

<template>
	<div class="flex flex-col items-center gap-1">
		<div
			v-for="p in props.playlists"
			class="group flex h-16 w-16 cursor-pointer items-center justify-center rounded-md transition-colors hover:bg-gray-200 dark:hover:bg-[#252525]"
			@click="onPlaylistClick(p)"
		>
			<NuxtImg :src="p.images[0].url" class="h-4/5 w-4/5 rounded-md" />

			<!-- Absolute tooltip to the right -->
			<PlaylistTooltip
				:playlist-name="p.name"
				:type="p.type"
				:owner="p.owner.display_name"
				class="group-hover:block"
			/>
		</div>
	</div>
</template>
