<script setup lang="ts">
	import EditPlaylistForm from '~/components/business/edit-playlist-form/index.vue';
	import {
		IconDelete,
		IconEdit,
		IconPlay,
		IconSettings,
	} from '~/components/ui/icons';
	import { useCurrentUserStore } from '~/store/useCurrentUserStore';
	import type IPlaylist from '../interfaces/IPlaylist';
	import type IMediaAlbumOrPlaylist from '~/interfaces/IMediaAlbumOrPlaylist';
	import Dropdown from '~/components/utils/Dropdown.vue';

	const localePath = useLocalePath();

	const curUserStore = useCurrentUserStore();

	const props = defineProps<{ playlist: IPlaylist | null }>();

	const { deleteMyPlaylist } = useMyPlaylists();

	const {
		isActive: isEditForm,
		activate: openEditForm,
		disactivate: closeEditForm,
	} = useClickawayClient('/playlists/:id.edit-playlist-form');
	const { isActive: isSettingsDropdown, toggle: toggleSettingsDropdown } =
		useClickawayClient('/playlist/:id.dropdown-settings');

	const playlistAsMediaItemForEditing = computed<IMediaAlbumOrPlaylist>(() => {
		const item = <IMediaAlbumOrPlaylist>{
			id: props.playlist?.id,
			type: 'playlist',
			name: props.playlist?.name,
			description: props.playlist?.description,
			owner: props.playlist?.owner.display_name,
			image: props.playlist?.images ? props.playlist?.images[0] : null,
		};

		return item;
	});

	const isMyPlaylist = computed(() => {
		if (curUserStore.user == null) return false;

		return curUserStore.user.id === props.playlist?.owner?.id;
	});

	const onDeletePlaylist = () => {
		if (props.playlist == null) return;

		deleteMyPlaylist(props.playlist.id).then(() => {
			navigateTo(localePath('/'));
		});
	};
</script>

<template>
	<div
		v-if="props.playlist"
		class="relative flex items-center justify-start gap-4 px-4"
	>
		<!-- Play button -->
		<div
			role="button"
			class="flex cursor-pointer items-center justify-center rounded-full bg-green-500 p-4 transition-all hover:scale-105 hover:bg-green-400"
		>
			<IconPlay class="scale-[200%]" />
		</div>

		<!-- Playlist settings button -->
		<div class="relative">
			<!-- Edit playlist -->
			<IconSettings
				v-if="isMyPlaylist"
				role="button"
				class="scale-150 cursor-pointer text-zinc-400 transition-all hover:scale-[160%] hover:text-black dark:text-zinc-500 dark:hover:text-white"
				@mousedown.stop="toggleSettingsDropdown()"
			/>

			<Dropdown
				ref="/playlist/:id.dropdown-settings"
				class="top-0 -translate-x-6 translate-y-8 rounded-md bg-zinc-100 p-2 shadow-lg transition-all dark:bg-zinc-800"
				:class="{
					'scale-100 opacity-100': isSettingsDropdown,
					'scale-0 opacity-0': !isSettingsDropdown,
				}"
			>
				<!-- Edit my playlist -->
				<div
					class="flex cursor-pointer items-center gap-2 px-2 py-1 transition-colors hover:bg-zinc-300 dark:hover:bg-zinc-900"
					@click="openEditForm()"
				>
					<ClientOnly>
						<IconEdit class="scale-125 text-zinc-600 dark:text-zinc-300" />
					</ClientOnly>

					<p class="text-nowrap dark:text-white">
						{{ $t('modules.sidebar-library.item-context-menu.edit-playlist') }}
					</p>
				</div>

				<!-- Delete my playlist -->
				<div
					class="group flex cursor-pointer items-center gap-2 px-2 py-1 transition-colors hover:bg-zinc-300 dark:hover:bg-zinc-900"
					@click="onDeletePlaylist()"
				>
					<ClientOnly>
						<IconDelete class="scale-125 text-zinc-600 dark:text-zinc-300" />
					</ClientOnly>

					<p class="dark:text-white">
						{{
							$t('modules.sidebar-library.item-context-menu.delete-playlist')
						}}
					</p>
				</div>
			</Dropdown>
		</div>

		<!-- Absolute form -->
		<EditPlaylistForm
			ref="/playlists/:id.edit-playlist-form"
			:is-visible="isEditForm"
			:playlist="playlistAsMediaItemForEditing"
			@close-edit-playlist-form="closeEditForm()"
			@on-update-playlist="closeEditForm()"
		/>
	</div>
</template>
