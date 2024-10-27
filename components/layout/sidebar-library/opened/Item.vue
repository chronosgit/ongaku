<script setup lang="ts">
	import ItemContextMenu from '../ItemContextMenu.vue';
	import { IconPlay, IconQuestionMark } from '~/components/ui/icons';
	import type IMediaAlbumOrPlaylist from '~/interfaces/IMediaAlbumOrPlaylist';

	const props = defineProps<{ item: IMediaAlbumOrPlaylist }>();

	const localePath = useLocalePath();

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

	const onItemClick = () => {
		if (props.item.type === 'playlist') {
			navigateTo(localePath(`/playlists/${props.item.id}`));
		}
	};
</script>

<template>
	<div
		class="group flex cursor-pointer items-center gap-2 rounded-md p-1.5 transition-colors hover:bg-gray-200 dark:hover:bg-[#252525]"
		@click="onItemClick()"
		@contextmenu.prevent="onItemRightClick($event)"
	>
		<!-- Cover image -->
		<div class="relative">
			<!-- Cover image -->
			<NuxtImg
				v-if="props.item.image.url"
				:src="props.item.image.url"
				class="w-full max-w-12 rounded-md"
			/>

			<!-- Placeholder -->
			<div
				v-else
				class="flex h-12 w-12 items-center justify-center rounded-md bg-zinc-300 dark:bg-zinc-700"
			>
				<IconQuestionMark class="scale-150 text-zinc-400 dark:text-zinc-500" />
			</div>

			<!-- On-hover play icon and darkening overlay -->
			<div class="hidden transition-all group-hover:block">
				<IconPlay
					class="absolute bottom-1/2 left-1/2 z-30 -translate-x-1/2 translate-y-1/2 scale-150 text-white transition-transform hover:scale-[200%] dark:text-white"
					@click="console.log('Play', props.item.name)"
				/>

				<div class="absolute inset-0 bg-black bg-opacity-25"></div>
			</div>
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
				:playlist="props.item"
				:is-visible="isActive"
				:style="ctxMenuStyle"
				@close-context-menu="disactivate"
			/>
		</Teleport>
	</div>
</template>
