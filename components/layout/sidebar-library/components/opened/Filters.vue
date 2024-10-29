<script setup lang="ts">
	import { IconClose } from '~/components/ui/icons';
	import WrapperIconRound from '~/components/shared/WrapperIconRound.vue';

	const filter = inject<'album' | 'playlist' | null>('filter', null);
	const filterByAlbums = inject<Function>('filterByAlbums', () => {});
	const filterByPlaylists = inject<Function>('filterByPlaylists', () => {});
	const deselectFilter = inject<Function>('deselectFilter', () => {});
</script>

<template>
	<div class="flex items-center gap-2">
		<!-- No filters -->
		<template v-if="filter == null">
			<div
				class="cursor-pointer rounded-full bg-gray-300 px-4 py-1 text-sm transition-colors hover:bg-indigo-600 hover:text-white dark:bg-gray-800 dark:text-gray-500"
				@click="filterByPlaylists()"
			>
				{{ $t('dictionary.playlist.many') }}
			</div>

			<div
				class="cursor-pointer rounded-full bg-gray-300 px-4 py-1 text-sm transition-colors hover:bg-indigo-600 hover:text-white dark:bg-gray-800 dark:text-gray-500"
				@click="filterByAlbums()"
			>
				{{ $t('dictionary.album.many') }}
			</div>
		</template>

		<!-- Album filter -->
		<div
			v-else-if="filter === 'album'"
			class="flex items-center gap-2"
			@click="deselectFilter()"
		>
			<WrapperIconRound class="group cursor-pointer p-1">
				<ClientOnly>
					<IconClose class="scale-110" />
				</ClientOnly>
			</WrapperIconRound>

			<div
				class="cursor-pointer rounded-full bg-indigo-600 px-4 py-1 text-sm text-white transition-all hover:scale-105"
			>
				{{ $t('dictionary.album.many') }}
			</div>
		</div>

		<!-- Playlist filter -->
		<div v-else class="flex items-center gap-2" @click="deselectFilter()">
			<WrapperIconRound class="group cursor-pointer p-1">
				<ClientOnly>
					<IconClose class="scale-110" />
				</ClientOnly>
			</WrapperIconRound>

			<div
				class="cursor-pointer rounded-full bg-indigo-600 px-4 py-1 text-sm text-white transition-all hover:scale-105"
			>
				{{ $t('dictionary.playlist.many') }}
			</div>
		</div>
	</div>
</template>
