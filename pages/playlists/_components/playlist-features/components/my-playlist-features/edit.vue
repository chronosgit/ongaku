<script setup lang="ts">
	import { IconEdit } from '~/components/ui/icons';

	const openEditForm = inject<() => void>('openEditForm', () => {});
</script>

<template>
	<div
		class="flex cursor-pointer items-center gap-2 px-2 py-1 transition-colors hover:bg-zinc-300 dark:hover:bg-zinc-900"
		@click="openEditForm"
	>
		<ClientOnly>
			<IconEdit class="scale-125 text-zinc-600 dark:text-zinc-300" />
		</ClientOnly>

		<p class="text-nowrap dark:text-white">
			{{ $t('modules.sidebar-library.item-context-menu.edit-playlist') }}
		</p>
	</div>
</template>
