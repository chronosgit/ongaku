<script setup lang="ts">
	import { IconClose } from '~/components/ui/icons';
	import ImagePrompt from './ImagePrompt.vue';
	import type IMediaAlbumOrPlaylist from '~/interfaces/IMediaAlbumOrPlaylist';

	const props = defineProps<{
		playlist: IMediaAlbumOrPlaylist;
		isVisible: boolean;
	}>();

	const emit = defineEmits<{
		(e: 'closeEditPlaylistForm'): void;
		(e: 'onUpdatePlaylist'): void;
	}>();

	const { imageBase64, updateMyPlaylist, updateImage, deleteImage } =
		useMyPlaylists();

	const name = ref('');
	const descr = ref('');

	watch(
		() => props.playlist,
		() => {
			name.value = props.playlist.name;
			descr.value = props.playlist.description || '';
		}
	);
</script>

<template>
	<div
		class="fixed inset-0 z-[999] items-center justify-center bg-black bg-opacity-70"
		:class="{ flex: props.isVisible, hidden: !props.isVisible }"
		@click.self="emit('closeEditPlaylistForm')"
	>
		<div class="mx-4 w-full max-w-3xl rounded-md bg-white p-4 dark:bg-zinc-900">
			<!-- First row -->
			<div class="mb-4 flex items-center justify-between gap-1">
				<p class="text-lg font-bold dark:text-white">
					{{ $t('modules.sidebar-library.edit-playlist-form.title') }}
				</p>

				<ClientOnly>
					<IconClose
						class="scale-125 cursor-pointer text-zinc-500 transition-colors hover:text-black dark:hover:text-white"
						@click="emit('closeEditPlaylistForm')"
					/>
				</ClientOnly>
			</div>

			<!-- Main box -->
			<div class="mb-2 flex w-full items-center justify-between gap-3">
				<!-- Add playlist image -->
				<ImagePrompt
					:image="props.playlist.image"
					:user-image-base64="imageBase64"
					@update-image="updateImage"
					@delete-image="deleteImage"
				/>

				<!-- Inputs -->
				<div class="h-full w-full space-y-4">
					<!-- Playlist name -->
					<input
						v-model="name"
						type="text"
						:placeholder="
							$t(
								'modules.sidebar-library.edit-playlist-form.input-name-placeholder'
							)
						"
						class="placeholder:text-gray block w-full rounded-md bg-zinc-200 p-2 font-bold dark:bg-zinc-800 dark:text-white"
					/>

					<!-- Playlist description -->
					<textarea
						v-model="descr"
						type="text"
						:placeholder="
							$t(
								'modules.sidebar-library.edit-playlist-form.input-descr-placeholder'
							)
						"
						class="block h-32 w-full resize-none rounded-md bg-zinc-200 p-2 font-bold dark:bg-zinc-800 dark:text-white"
					/>
				</div>
			</div>

			<button
				class="ml-auto block rounded-full bg-black px-4 py-2 text-sm font-bold text-white dark:bg-white dark:text-black"
				@click="
					updateMyPlaylist(props.playlist.id, { name, descr }).then(() => {
						emit('onUpdatePlaylist');
						emit('closeEditPlaylistForm');
					})
				"
			>
				{{ $t('dictionary.save') }}
			</button>
		</div>
	</div>
</template>
