<script setup lang="ts">
	const emit = defineEmits<{
		(e: 'selectOnlyAlbums'): void;
		(e: 'selectOnlyPlaylists'): void;
	}>();
</script>

<template>
	<div class="flex items-center gap-2">
		<div
			class="cursor-pointer rounded-full bg-gray-800 px-4 py-1 text-sm text-gray-500 transition-colors hover:bg-gray-600 hover:text-white"
			@click="emit('selectOnlyPlaylists')"
		>
			{{ $t('dictionary.playlist.many') }}
		</div>

		<div
			class="cursor-pointer rounded-full bg-gray-800 px-4 py-1 text-sm text-gray-500 transition-colors hover:bg-gray-600 hover:text-white"
			@click="emit('selectOnlyAlbums')"
		>
			{{ $t('dictionary.album.many') }}
		</div>
	</div>
</template>
