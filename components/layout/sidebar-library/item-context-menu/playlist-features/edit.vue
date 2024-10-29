<script setup lang="ts">
	import { IconEdit } from '~/components/ui/icons';
	import type IMediaItem from '../../interfaces/IMediaItem';

	const EditPlaylistForm = defineAsyncComponent(
		() => import('~/components/features/playlists/edit-playlist-form/index.vue')
	);

	const editPlaylistLocally = inject<
		(playlistId: string, newName: string, newDescr: string) => void
	>('editPlaylistLocally', () => {});
	const closeCtxMenu = inject<Function>('closeCtxMenu', () => {});

	const props = defineProps<{
		playlist: IMediaItem;
	}>();

	const editPlaylistFormRef = computed(() => {
		return `sidebar-lib.item-ctx-menu.edit-playlist-form.${props.playlist.id}`;
	});

	const { isActive, activate, disactivate } = useClickawayClient(
		editPlaylistFormRef.value
	);

	const onEditPlaylistSuccess = (
		playlistId: string,
		newName: string,
		newDescr: string
	) => {
		editPlaylistLocally(playlistId, newName, newDescr);
		closeCtxMenu();
	};
</script>

<template>
	<div
		class="px-2 py-1 transition-colors hover:bg-zinc-300 dark:hover:bg-zinc-900"
	>
		<div class="flex cursor-pointer items-center gap-2" @click="activate">
			<ClientOnly>
				<IconEdit class="scale-125 text-zinc-600 dark:text-zinc-300" />
			</ClientOnly>

			<p class="dark:text-white">
				{{ $t('modules.sidebar-library.item-context-menu.edit-playlist') }}
			</p>
		</div>

		<EditPlaylistForm
			:ref="editPlaylistFormRef"
			:is-visible="isActive"
			:id="props.playlist.id"
			:name="props.playlist.name"
			:descr="props.playlist.descr"
			:image="props.playlist.image"
			@close-form="disactivate"
			@on-edit-success="onEditPlaylistSuccess"
		/>
	</div>
</template>
