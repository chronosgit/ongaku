<script setup lang="ts">
	import { useCurrentUserStore } from '~/store/useCurrentUserStore';
	import type IPlaylistObject from '~/interfaces/business/playlists/IPlaylistObject';
	import {
		IconDelete,
		IconEdit,
		IconPlay,
		IconSettings,
	} from '~/components/ui/icons';
	import PlaylistsService from '~/services/PlaylistsService';

	const EditPlaylistForm = defineAsyncComponent(
		() => import('~/components/features/playlists/edit-playlist-form/index.vue')
	);

	const { t } = useI18n();
	const localePath = useLocalePath();
	const curUserStore = useCurrentUserStore();

	const editPlaylistLocally = inject<
		(playlistId: string, newName: string, newDescr: string) => void
	>('editPlaylistLocally', () => {});
	const createToast = inject<FCreateToast>('createToast', () => {});

	const props = defineProps<{ playlist: IPlaylistObject | null }>();

	const {
		isActive: isEditForm,
		activate: openEditForm,
		disactivate: closeEditForm,
	} = useClickawayClient(`/playlists/${props.playlist?.id}.edit-playlist-form`);

	const { isActive: isSettingsDropdown, toggle: toggleSettingsDropdown } =
		useClickawayClient('/playlist/:id.dropdown-settings');

	const isMyPlaylist = computed(() => {
		if (curUserStore.user == null) return false;

		return curUserStore.user.id === props.playlist?.owner?.id;
	});

	const playlistCoverImage = computed(() => {
		if (!Array.isArray(props.playlist?.images) || !props.playlist.images.length)
			return null;

		return props.playlist.images[0];
	});

	const deleteThisPlaylist = async () => {
		try {
			if (props.playlist == null) return;

			await PlaylistsService.deletePlaylist(props.playlist.id);

			createToast({
				id: props.playlist.id,
				type: 'success',
				message: t('toasts.playlists.delete.success'),
				lifespan: 3000,
			});

			navigateTo(localePath('/'));
		} catch (err) {
			console.error(err);
		}
	};

	const onEditSuccess = (
		playlistId: string,
		newName: string,
		newDescr: string
	) => {
		editPlaylistLocally(playlistId, newName, newDescr);
		closeEditForm();
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
			@click="console.log(`Play ${props.playlist.name}`)"
		>
			<ClientOnly><IconPlay class="scale-[200%]" /></ClientOnly>
		</div>

		<!-- Playlist settings button -->
		<div class="relative">
			<!-- Dropdown opener -->
			<ClientOnly>
				<IconSettings
					v-if="isMyPlaylist"
					role="button"
					class="scale-150 cursor-pointer text-zinc-400 transition-all hover:scale-[160%] hover:text-black dark:text-zinc-500 dark:hover:text-white"
					@mousedown.stop="toggleSettingsDropdown()"
				/>
			</ClientOnly>

			<!--Dropdown with settings -->
			<div
				ref="/playlist/:id.dropdown-settings"
				class="absolute top-0 -translate-x-6 translate-y-8 rounded-md bg-zinc-100 p-2 shadow-lg transition-all dark:bg-zinc-800"
				:class="{
					'scale-y-100 opacity-100': isSettingsDropdown,
					'scale-y-0 opacity-0': !isSettingsDropdown,
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
					@click="deleteThisPlaylist"
				>
					<ClientOnly>
						<IconDelete class="scale-125 text-zinc-600 dark:text-zinc-300" />
					</ClientOnly>

					<p class="text-nowrap dark:text-white">
						{{
							$t('modules.sidebar-library.item-context-menu.delete-playlist')
						}}
					</p>
				</div>
			</div>
		</div>

		<!-- Absolute form -->
		<EditPlaylistForm
			:ref="`/playlists/${props.playlist?.id}.edit-playlist-form`"
			:is-visible="isEditForm"
			:id="props.playlist.id"
			:name="props.playlist.name"
			:descr="props.playlist.description"
			:image="playlistCoverImage"
			@close-form="closeEditForm"
			@on-edit-success="onEditSuccess"
		/>
	</div>
</template>
