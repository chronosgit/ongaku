<script setup lang="ts">
	import { IconClose } from '~/components/ui/icons';
	import WrapperIconRound from '~/components/ui/WrapperIconRound.vue';

	const props = defineProps<{ filter: 'album' | 'playlist' | null }>();

	const emit = defineEmits<{
		(e: 'selectOnlyAlbums'): void;
		(e: 'selectOnlyPlaylists'): void;
		(e: 'deselectFilters'): void;
	}>();
</script>

<template>
	<div class="flex items-center gap-2">
		<!-- No filters -->
		<template v-if="props.filter == null">
			<div
				class="cursor-pointer rounded-full bg-gray-300 px-4 py-1 text-sm transition-colors hover:bg-gray-600 hover:text-white dark:bg-gray-800 dark:text-gray-500"
				@click="emit('selectOnlyPlaylists')"
			>
				{{ $t('dictionary.playlist.many') }}
			</div>

			<div
				class="cursor-pointer rounded-full bg-gray-300 px-4 py-1 text-sm transition-colors hover:bg-gray-600 hover:text-white dark:bg-gray-800 dark:text-gray-500"
				@click="emit('selectOnlyAlbums')"
			>
				{{ $t('dictionary.album.many') }}
			</div>
		</template>

		<!-- Album filter -->
		<template v-if="props.filter === 'album'">
			<WrapperIconRound
				class="group cursor-pointer"
				@click="emit('deselectFilters')"
			>
				<ClientOnly>
					<IconClose class="scale-125" />
				</ClientOnly>
			</WrapperIconRound>

			<div
				class="cursor-pointer rounded-full bg-gray-300 px-4 py-1 text-sm transition-colors hover:bg-black hover:text-white dark:bg-white dark:text-black dark:hover:bg-gray-200 dark:hover:text-black"
				@click="emit('deselectFilters')"
			>
				{{ $t('dictionary.album.many') }}
			</div>
		</template>

		<!-- Playlist filter -->
		<template v-if="props.filter === 'playlist'">
			<WrapperIconRound
				class="group cursor-pointer"
				@click="emit('deselectFilters')"
			>
				<ClientOnly>
					<IconClose class="scale-125" />
				</ClientOnly>
			</WrapperIconRound>

			<div
				class="cursor-pointer rounded-full bg-gray-300 px-4 py-1 text-sm transition-colors hover:bg-black hover:text-white dark:bg-white dark:text-black dark:hover:bg-gray-200 dark:hover:text-black"
				@click="emit('deselectFilters')"
			>
				{{ $t('dictionary.playlist.many') }}
			</div>
		</template>
	</div>
</template>
