<script setup lang="ts">
	import ItemTooltip from './ItemTooltip.vue';
	import type IMyAlbum from '~/interfaces/IMyAlbum';
	import type ISimplifiedPlaylist from '~/interfaces/ISimplifiedPlaylist';

	const props = defineProps<{ items: (IMyAlbum | ISimplifiedPlaylist)[] }>();

	const onItemClick = (item: ISimplifiedPlaylist | IMyAlbum) => {
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
			<NuxtImg :src="i.images[0].url" class="h-4/5 w-4/5 rounded-md" />

			<!-- Absolute tooltip to the right -->
			<!-- <ItemTooltip

				:name="i.name"
				:type="i.type"
				:owner=""
				class="group-hover:block"
			/> -->
		</div>
	</div>
</template>
