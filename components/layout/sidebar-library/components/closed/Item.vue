<script setup lang="ts">
	import CoverImage from '../cover-image/index.vue';
	import ItemTooltip from './ItemTooltip.vue';
	import type IMediaItem from '../../interfaces/IMediaItem';

	const ItemContextMenu = defineAsyncComponent(
		() =>
			import(
				'~/components/layout/sidebar-library/components/item-context-menu/index.vue'
			)
	);

	const removePlaylistLocally = inject<(playlistId: string) => void>(
		'removePlaylistLocally',
		() => {}
	);
	const editPlaylistLocally = inject<
		(playlistId: string, newName: string, newDescr: string) => void
	>('editPlaylistLocally', () => {});

	const localePath = useLocalePath();

	const props = defineProps<{
		item: IMediaItem;
	}>();

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
		if (props.item.type === 'playlist') {
			navigateTo(localePath(`/playlists/${props.item.id}`));
		} else {
			navigateTo(localePath(`/albums/${props.item.id}`));
		}
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
			:owner="props.item.owners[0].name"
			class="group-hover:block"
		/>

		<Teleport to="body">
			<ItemContextMenu
				:ref="`sidebar-library-item-ctx-menu-${props.item.id}`"
				:item="props.item"
				:is-visible="isOpened"
				:style="ctxMenuStyle"
				@close-context-menu="closeCtxMenu"
				@remove-playlist-locally="removePlaylistLocally"
				@edit-playlist-locally="editPlaylistLocally"
			/>
		</Teleport>
	</div>
</template>
