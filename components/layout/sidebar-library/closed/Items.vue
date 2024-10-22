<script setup lang="ts">
	import type IMediaAlbumOrPlaylist from '~/interfaces/IMediaAlbumOrPlaylist';
	import ItemTooltip from './ItemTooltip.vue';

	const props = defineProps<{ items: IMediaAlbumOrPlaylist[] }>();

	const onItemClick = (item: IMediaAlbumOrPlaylist) => {
		console.log(item);
	};
</script>

<template>
	<div class="flex flex-col items-center gap-1">
		<div
			v-for="i in props.items"
			class="group flex h-16 w-16 cursor-pointer items-center justify-center rounded-md transition-colors hover:bg-gray-200 dark:hover:bg-[#252525]"
			@click="onItemClick(i)"
		>
			<NuxtImg :src="i.image.url" class="h-4/5 w-4/5 rounded-md" />

			<!-- Absolute tooltip to the right -->
			<ItemTooltip
				:name="i.name"
				:type="i.type"
				:owner="i.owner"
				class="group-hover:block"
			/>
		</div>
	</div>
</template>
