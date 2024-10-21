<script setup lang="ts">
	import { IconDoubleArrowRight } from '~/components/ui/icons';
	import { useLayoutStore } from '~/store/useLayoutStore';

	const layoutStore = useLayoutStore();

	const mock: any[] = [];
</script>

<template>
	<aside
		ref="library-sidebar-red"
		class="absolute m-2 w-full rounded-lg border-[1px] border-[#d3d2d2] bg-gray-100 p-4 transition-transform dark:border-[#252525] dark:bg-[#121212] dark:text-white"
		:class="{
			'translate-x-0': layoutStore.isLeftSideVisible,
			'-translate-x-32': !layoutStore.isLeftSideVisible,

			'max-w-80': layoutStore.isLeftSideOpen,
			'max-w-20': !layoutStore.isLeftSideOpen,
		}"
	>
		<div class="flex flex-col items-center gap-4">
			<div class="flex items-center justify-between">
				<IconDoubleArrowRight
					class="scale-150 cursor-pointer text-gray-400 transition-colors hover:text-black dark:hover:text-white"
					@click="layoutStore.openLeftSide"
				/>

				<p>Bimbo</p>
			</div>

			<template v-if="mock.length > 0">
				<div v-for="l in mock">
					{{ l }}
				</div>
			</template>

			<p v-else class="text-center text-xs text-gray-500">
				{{ $t('modules.library-sidebar.no-playlists') }}
			</p>
		</div>
	</aside>
</template>
