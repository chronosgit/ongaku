<script setup lang="ts">
	import { useLayoutStore } from '~/store/useLayoutStore';
	import type IPlaylist from '~/interfaces/IPlaylist';
	import { IconLibrary, IconPlus } from '~/components/ui/icons';

	const props = defineProps<{
		playlists: IPlaylist[] | null;
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

			<IconPlus
				class="scale-150 cursor-pointer text-gray-400 transition-colors hover:text-black dark:hover:text-white"
				@click="console.log('Create playlist')"
			/>
		</div>

		<!-- Filters row -->
		<div class="flex items-center gap-2">
			<div
				class="cursor-pointer rounded-full bg-gray-300 px-4 py-1 text-gray-700 transition-colors hover:bg-gray-400 hover:text-white"
				@click="console.log('Fetch with playlists filter')"
			>
				Playlists
			</div>

			<div
				class="cursor-pointer rounded-full bg-gray-300 px-4 py-1 text-gray-700 transition-colors hover:bg-gray-400 hover:text-white"
				@click="console.log('Fetch with albums filter')"
			>
				Albums
			</div>
		</div>
	</div>
</template>
