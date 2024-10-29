<script setup lang="ts">
	import { IconDoubleArrowRight } from '~/components/ui/icons';
	import Items from './Items.vue';
	import ItemsSkeleton from './ItemsSkeleton.vue';
	import { useLayoutStore } from '~/store/useLayoutStore';
	import type IMediaAlbumOrPlaylist from '~/interfaces/IMediaAlbumOrPlaylist';

	const props = defineProps<{
		items: IMediaAlbumOrPlaylist[] | null;
		isLoading: boolean;
	}>();

	const layoutStore = useLayoutStore();
</script>

<template>
	<div
		class="h-full space-y-4 overflow-x-hidden scrollbar scrollbar-thumb-gray-300 scrollbar-thumb-rounded-lg scrollbar-w-1 dark:scrollbar-thumb-[#1d1d1d]"
		:class="props.isLoading ? 'overflow-y-hidden' : 'overflow-y-auto'"
	>
		<!-- Extend sidebar -->
		<ClientOnly>
			<IconDoubleArrowRight
				class="mx-auto my-0 block scale-150 cursor-pointer text-gray-400 transition-colors hover:text-black dark:hover:text-white"
				@click="layoutStore.openLeftSide"
			/>
		</ClientOnly>

		<!-- Loading indicator -->
		<ItemsSkeleton v-if="props.isLoading" />

		<!-- After loading -->
		<template v-else>
			<!-- My playlists -->
			<Items v-if="props.items" :items="props.items" />

			<!-- No playlists found -->
			<p v-else class="text-center text-xs text-gray-500">
				{{ $t('modules.sidebar-library.closed.no-playlists') }}
			</p>
		</template>
	</div>
</template>
