<script setup lang="ts">
	import ItemContextMenu from '../ItemContextMenu.vue';
	import { IconQuestionMark } from '~/components/ui/icons';
	import type IMediaAlbumOrPlaylist from '~/interfaces/IMediaAlbumOrPlaylist';

	const props = defineProps<{ item: IMediaAlbumOrPlaylist }>();

	const { isActive, activate, disactivate } = useClickawayClient(
		`sidebar-library-item-${props.item.id}`
	);

	const ctxMenuCoords = ref({ x: 0, y: 0 });

	const onItemRightClick = (e: MouseEvent) => {
		ctxMenuCoords.value = {
			x: e.clientX,
			y: e.clientY,
		};

		activate();
	};

	const ctxMenuStyle = computed(() => {
		return {
			position: 'absolute',
			top: `${ctxMenuCoords.value.y}px`,
			left: `${ctxMenuCoords.value.x}px`,
		};
	});
</script>

<template>
	<div
		class="flex cursor-pointer items-center gap-2 rounded-md p-1.5 transition-colors hover:bg-gray-200 dark:hover:bg-[#252525]"
		@contextmenu.prevent="onItemRightClick($event)"
	>
		<!-- Image -->
		<NuxtImg
			v-if="props.item.image.url"
			:src="props.item.image.url"
			class="w-full max-w-12 rounded-md"
		/>

		<div
			v-else
			class="flex h-12 w-12 items-center justify-center rounded-md bg-zinc-300 dark:bg-zinc-700"
		>
			<IconQuestionMark class="scale-150 text-zinc-400 dark:text-zinc-500" />
		</div>

		<!-- Details -->
		<div>
			<p>{{ props.item.name }}</p>

			<p class="text-xs text-gray-400">
				{{ $t(`dictionary.${props.item.type}.one`) }} &#x2022;
				{{ props.item.owner }}
			</p>
		</div>

		<!-- Context menu -->
		<Teleport to="body">
			<ItemContextMenu
				:ref="`sidebar-library-item-${props.item.id}`"
				:playlist-id="props.item.id"
				:playlist-type="props.item.type"
				:is-visible="isActive"
				:style="ctxMenuStyle"
				@close-context-menu="disactivate"
			/>
		</Teleport>
	</div>
</template>
