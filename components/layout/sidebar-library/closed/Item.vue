<script setup lang="ts">
	import ItemTooltip from './ItemTooltip.vue';
	import ItemContextMenu from '../item-context-menu/index.vue';
	import CoverImage from '../cover-image/index.vue';
	import type IMediaAlbumOrPlaylist from '~/interfaces/IMediaAlbumOrPlaylist';

	const localePath = useLocalePath();

	const props = defineProps<{ item: IMediaAlbumOrPlaylist }>();

	const { coords, isOpened, openCtxMenu, closeCtxMenu } = useBaseContextMenu(
		`sidebar-library-item-ctx-menu-${props.item.id}`
	);

	const ctxMenuStyle = computed(() => {
		return {
			position: 'absolute',
			top: `${coords.value.y}px`,
			left: `${coords.value.x}px`,
		};
	});

	const onItemClick = () => {
		if (props.item.type !== 'playlist') return;

		navigateTo(localePath(`/playlists/${props.item.id}`));
	};
</script>

<template>
	<div
		class="group flex h-16 w-16 cursor-pointer items-center justify-center rounded-md transition-colors hover:bg-gray-200 dark:hover:bg-[#252525]"
		@click="onItemClick()"
		@contextmenu.prevent="openCtxMenu($event)"
	>
		<CoverImage :image="props.item.image" />

		<ItemTooltip
			:name="props.item.name"
			:type="props.item.type"
			:owner="props.item.owner"
			class="group-hover:block"
		/>

		<Teleport to="body">
			<ItemContextMenu
				:ref="`sidebar-library-item-ctx-menu-${props.item.id}`"
				:playlist="props.item"
				:is-visible="isOpened"
				:style="ctxMenuStyle"
				@close-context-menu="closeCtxMenu"
			/>
		</Teleport>
	</div>
</template>
