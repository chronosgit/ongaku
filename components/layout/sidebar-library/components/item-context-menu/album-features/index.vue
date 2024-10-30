<script setup lang="ts">
	import { IconCheck } from '~/components/ui/icons';
	import type IMediaItem from '../../interfaces/IMediaItem';

	const props = defineProps<{
		playlist: IMediaItem;
	}>();
</script>

<template>
	<div
		class="group flex cursor-pointer items-center gap-2 px-2 py-1 transition-colors hover:bg-zinc-300 dark:hover:bg-zinc-900"
		@click=""
	>
		<div
			class="flex items-center justify-center rounded-full bg-green-500 p-0.5"
		>
			<ClientOnly>
				<IconCheck class="text-white" />
			</ClientOnly>
		</div>

		<p class="dark:text-white">
			{{ $t('modules.sidebar-library.item-context-menu.delete-album') }}
		</p>
	</div>
</template>
