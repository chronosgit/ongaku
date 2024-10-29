<script setup lang="ts">
	import { IconClose } from '~/components/ui/icons';

	const closeForm = inject<Function>('closeForm', () => {});
</script>

<template>
	<div class="mb-4 flex items-center justify-between gap-1">
		<p class="text-lg font-bold dark:text-white">
			{{ $t('modules.sidebar-library.edit-playlist-form.title') }}
		</p>

		<ClientOnly>
			<IconClose
				class="scale-125 cursor-pointer text-zinc-500 transition-colors hover:text-black dark:hover:text-white"
				@click="closeForm()"
			/>
		</ClientOnly>
	</div>
</template>
