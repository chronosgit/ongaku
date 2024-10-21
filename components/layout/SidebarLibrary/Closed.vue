<script setup lang="ts">
	import { IconDoubleArrowRight } from '~/components/ui/icons';
	import { useLayoutStore } from '~/store/useLayoutStore';

	const props = defineProps<{
		playlists: any[];
	}>();

	const layoutStore = useLayoutStore();
</script>

<template>
	<div class="flex flex-col items-center gap-4">
		<IconDoubleArrowRight
			class="scale-150 cursor-pointer text-gray-400 transition-colors hover:text-black dark:hover:text-white"
			@click="layoutStore.openLeftSide"
		/>

		<template v-if="props.playlists.length > 0">
			<div v-for="p in props.playlists">
				{{ p }}
			</div>
		</template>

		<p v-else class="text-center text-xs text-gray-500">
			{{ $t('modules.library-sidebar.no-playlists') }}
		</p>
	</div>
</template>
