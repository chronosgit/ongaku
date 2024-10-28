<script setup lang="ts">
	import Header from './Header.vue';
	import EditableCoverImage from './EditableCoverImage.vue';
	import type IMediaAlbumOrPlaylist from '~/interfaces/IMediaAlbumOrPlaylist';

	const props = defineProps<{
		playlist: IMediaAlbumOrPlaylist;
		isVisible: boolean;
	}>();
	const emit = defineEmits<{
		(e: 'closeEditPlaylistForm'): void;
		(e: 'onUpdatePlaylist'): void;
	}>();

	const { updateMyPlaylist, imageBase64, updateImage, deleteImage } =
		useMyPlaylists();

	const name = ref(props.playlist.name || '');
	const descr = ref(props.playlist.description || '');

	const onEditPlaylist = () => {
		updateMyPlaylist(props.playlist.id, {
			name: name.value,
			descr: descr.value,
		}).then(() => {
			emit('onUpdatePlaylist');
			emit('closeEditPlaylistForm');
		});
	};

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
		class="fixed inset-0 z-50 items-center justify-center bg-black bg-opacity-70"
		:class="{ flex: props.isVisible, hidden: !props.isVisible }"
		@click.self="emit('closeEditPlaylistForm')"
	>
		<div class="mx-4 w-full max-w-3xl rounded-md bg-white p-4 dark:bg-zinc-900">
			<Header />

			<!-- Main box -->
			<div class="mb-2 flex w-full items-center justify-between gap-3">
				<!-- Add playlist image -->
				<EditableCoverImage
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
				@click="onEditPlaylist()"
			>
				{{ $t('dictionary.save') }}
			</button>
		</div>
	</div>
</template>
