<script setup lang="ts">
	import { IconClose } from '~/components/ui/icons';

	const emit = defineEmits<{
		(e: 'closeEditPlaylistForm'): void;
	}>();
</script>

<template>
	<div class="mb-4 flex items-center justify-between gap-1">
		<p class="text-lg font-bold dark:text-white">
			{{ $t('modules.sidebar-library.edit-playlist-form.title') }}
		</p>

		<ClientOnly>
			<IconClose
				class="scale-125 cursor-pointer text-zinc-500 transition-colors hover:text-black dark:hover:text-white"
				@click="emit('closeEditPlaylistForm')"
			/>
		</ClientOnly>
	</div>
</template>
