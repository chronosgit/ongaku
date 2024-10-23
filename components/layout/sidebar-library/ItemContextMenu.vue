<script setup lang="ts">
	import { IconCheck, IconDelete, IconEdit } from '~/components/ui/icons';

	const props = defineProps<{
		playlistId: string;
		playlistType: 'playlist' | 'album';
		isVisible: boolean;
	}>();

	const emit = defineEmits<{
		(e: 'closeContextMenu'): void;
	}>();

	const { deleteMyPlaylist } = useMyPlaylists();

	const localRemoveItemById = inject('localRemoveItemById') as Function;

	const onPlaylistDelete = () => {
		deleteMyPlaylist(props.playlistId).then(() => {
			emit('closeContextMenu');

			localRemoveItemById(props.playlistId);
		});
	};
</script>

<template>
	<div
		class="absolute z-10 flex min-w-14 flex-col gap-0.5 rounded-sm bg-zinc-200 p-1 shadow-lg dark:bg-zinc-800"
		:class="{ block: props.isVisible, hidden: !props.isVisible }"
	>
		<!-- Playlist only feature -->
		<template v-if="props.playlistType === 'playlist'">
			<!-- Delete my playlist -->
			<div
				class="group flex cursor-pointer items-center gap-2 px-2 py-1 transition-colors hover:bg-zinc-300 dark:hover:bg-zinc-900"
				@click="onPlaylistDelete"
			>
				<IconDelete class="scale-125 text-zinc-600 dark:text-zinc-300" />

				<p class="dark:text-white">
					{{ $t('modules.sidebar-library.item-context-menu.delete-playlist') }}
				</p>
			</div>

			<!-- Edit my playlist -->
			<div
				class="flex cursor-pointer items-center gap-2 px-2 py-1 transition-colors hover:bg-zinc-300 dark:hover:bg-zinc-900"
			>
				<IconEdit class="scale-125 text-zinc-600 dark:text-zinc-300" />

				<p class="dark:text-white">
					{{ $t('modules.sidebar-library.item-context-menu.edit-playlist') }}
				</p>
			</div>
		</template>

		<!-- Album only feature -->
		<template v-else>
			<!-- Remove artist album from library -->
			<div
				class="group flex cursor-pointer items-center gap-2 px-2 py-1 transition-colors hover:bg-zinc-300 dark:hover:bg-zinc-900"
			>
				<div
					class="flex items-center justify-center rounded-full bg-green-500 p-0.5"
				>
					<IconCheck class="text-white" />
				</div>

				<p class="dark:text-white">
					{{ $t('modules.sidebar-library.item-context-menu.delete-album') }}
				</p>
			</div>
		</template>
	</div>
</template>
