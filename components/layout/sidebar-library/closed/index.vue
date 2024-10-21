<script setup lang="ts">
	import { IconDoubleArrowRight } from '~/components/ui/icons';
	import PlaylistsSkeleton from './PlaylistsSkeleton.vue';
	import Playlists from './Playlists.vue';
	import { useLayoutStore } from '~/store/useLayoutStore';
	import type IPlaylist from '~/interfaces/IPlaylist';

	const props = defineProps<{
		playlists: IPlaylist[] | null;
		isLoading: boolean;
	}>();

	const layoutStore = useLayoutStore();
</script>

<template>
	<div
		class="h-full space-y-4 overflow-x-hidden scrollbar scrollbar-thumb-gray-300 scrollbar-thumb-rounded-lg scrollbar-w-1 dark:scrollbar-thumb-[#1d1d1d]"
		:class="props.isLoading ? 'overflow-y-hidden' : 'overflow-y-auto'"
	>
		<IconDoubleArrowRight
			class="mx-auto my-0 block scale-150 cursor-pointer text-gray-400 transition-colors hover:text-black dark:hover:text-white"
			@click="layoutStore.openLeftSide"
		/>

		<!-- Loading indicator -->
		<template v-if="props.isLoading">
			<PlaylistsSkeleton />
		</template>

		<!-- Already loaded -->
		<template v-else>
			<!-- My playlists -->
			<Playlists v-if="props.playlists" :playlists="props.playlists" />

			<!-- No playlists found -->
			<p v-else class="text-center text-xs text-gray-500">
				{{ $t('modules.library-sidebar.no-playlists') }}
			</p>
		</template>
	</div>
</template>
