<script setup lang="ts">
	import { IconLibrary, IconPlus } from '~/components/ui/icons';
	import Tooltip from '~/components/ui/Tooltip.vue';
	import Items from './Items.vue';
	import Filters from './Filters.vue';
	import { useLayoutStore } from '~/store/useLayoutStore';
	import type IMediaAlbumOrPlaylist from '~/interfaces/IMediaAlbumOrPlaylist';

	const props = defineProps<{
		items: IMediaAlbumOrPlaylist[] | null;
		filter: 'album' | 'playlist' | null;
		isLoading: boolean;
	}>();

	const emit = defineEmits<{
		(e: 'selectOnlyAlbums'): void;
		(e: 'selectOnlyPlaylists'): void;
		(e: 'deselectFilters'): void;
		(e: 'refetchMediaItems'): void;
	}>();

	const layoutStore = useLayoutStore();

	const { createNewPlaylist } = useMyPlaylists();
</script>

<template>
	<div class="h-full px-4">
		<!-- First row -->
		<div class="mb-4 flex items-center justify-between">
			<!-- My library toggler -->
			<div
				class="group flex cursor-pointer items-center gap-2 text-[#8d8c8c] dark:text-[#b3b3b3]"
				@click="layoutStore.closeLeftSide"
			>
				<ClientOnly>
					<IconLibrary
						class="scale-150 transition-colors group-hover:text-black dark:group-hover:text-white"
					/>
				</ClientOnly>

				<p
					class="text-lg font-semibold transition-colors group-hover:text-black dark:group-hover:text-white"
				>
					{{ $t('modules.sidebar-library.opened.my-library') }}
				</p>
			</div>

			<div class="relative">
				<IconPlus
					class="peer scale-150 cursor-pointer text-gray-400 transition-colors hover:text-black dark:hover:text-white"
					@click="createNewPlaylist().then(() => emit('refetchMediaItems'))"
				/>

				<Tooltip
					class="bottom-0 w-max -translate-y-7 opacity-0 transition-opacity peer-hover:opacity-100"
				>
					{{ $t('modules.sidebar-library.opened.add-playlist-tooltip') }}
				</Tooltip>
			</div>
		</div>

		<!-- Second row -->
		<Filters
			v-if="!props.isLoading"
			class="mb-4"
			:filter="filter"
			@select-only-albums="emit('selectOnlyAlbums')"
			@select-only-playlists="emit('selectOnlyPlaylists')"
			@deselect-filters="emit('deselectFilters')"
		/>

		<div
			class="max-h-[39rem] overflow-x-hidden scrollbar scrollbar-thumb-gray-300 scrollbar-thumb-rounded-lg scrollbar-w-1 dark:scrollbar-thumb-[#1d1d1d]"
			:class="props.isLoading ? 'overflow-y-hidden' : 'overflow-y-auto'"
		>
			<Items :items="props.items" :is-loading="isLoading" />
		</div>
	</div>
</template>
