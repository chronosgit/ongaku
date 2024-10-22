<script setup lang="ts">
	import { useLayoutStore } from '~/store/useLayoutStore';
	import { IconLibrary, IconPlus } from '~/components/ui/icons';
	import type IMediaAlbumOrPlaylist from '~/interfaces/IMediaAlbumOrPlaylist';
	import Tooltip from '~/components/utils/Tooltip.vue';

	const props = defineProps<{
		items: IMediaAlbumOrPlaylist[] | null;
	}>();
	const layoutStore = useLayoutStore();
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
				<IconLibrary
					class="scale-150 transition-colors group-hover:text-black dark:group-hover:text-white"
				/>

				<p
					class="text-lg font-semibold transition-colors group-hover:text-black dark:group-hover:text-white"
				>
					{{ $t('modules.sidebar-library.opened.my-library') }}
				</p>
			</div>

			<div class="relative">
				<IconPlus
					class="peer scale-150 cursor-pointer text-gray-400 transition-colors hover:text-black dark:hover:text-white"
					@click="console.log('Create playlist')"
				/>

				<Tooltip
					class="bottom-0 w-max -translate-y-7 opacity-0 transition-opacity peer-hover:opacity-100"
				>
					{{ $t('modules.sidebar-library.opened.add-playlist-tooltip') }}
				</Tooltip>
			</div>
		</div>

		<!-- Filters row -->
		<div class="flex items-center gap-2">
			<div
				class="cursor-pointer rounded-full bg-gray-800 px-4 py-1 text-gray-500 transition-colors hover:bg-gray-600 hover:text-white"
				@click="console.log('Fetch with playlists filter')"
			>
				Playlists
			</div>

			<div
				class="cursor-pointer rounded-full bg-gray-800 px-4 py-1 text-gray-500 transition-colors hover:bg-gray-600 hover:text-white"
				@click="console.log('Fetch with albums filter')"
			>
				Albums
			</div>
		</div>
	</div>
</template>
