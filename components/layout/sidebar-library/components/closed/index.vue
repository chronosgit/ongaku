<script setup lang="ts">
	import { IconDoubleArrowRight } from '~/components/ui/icons';
	import ItemsSkeleton from './ItemsSkeleton.vue';
	import Items from './Items.vue';
	import { useLayoutStore } from '~/store/useLayoutStore';
	import type IMediaItem from '../../interfaces/IMediaItem';

	const mediaItems = inject('mediaItems') as IMediaItem[];
	const areMediaItemsLoading = inject('areMediaItemsLoading') as boolean;

	const layoutStore = useLayoutStore();
</script>

<template>
	<div
		class="h-full space-y-4 overflow-x-hidden scrollbar scrollbar-thumb-gray-300 scrollbar-thumb-rounded-lg scrollbar-w-1 dark:scrollbar-thumb-[#1d1d1d]"
		:class="areMediaItemsLoading ? 'overflow-y-hidden' : 'overflow-y-auto'"
	>
		<!-- Extend sidebar -->
		<ClientOnly>
			<IconDoubleArrowRight
				class="mx-auto my-0 block scale-150 cursor-pointer text-gray-400 transition-colors hover:text-indigo-600"
				@click="layoutStore.openLeftSide"
			/>
		</ClientOnly>

		<!-- Loading indicator -->
		<ItemsSkeleton v-if="areMediaItemsLoading" />

		<!-- My playlists -->
		<Items v-else-if="mediaItems" />

		<!-- No playlists found -->
		<p v-else class="text-center text-xs text-gray-500">
			{{ $t('modules.sidebar-library.closed.no-playlists') }}
		</p>
	</div>
</template>
