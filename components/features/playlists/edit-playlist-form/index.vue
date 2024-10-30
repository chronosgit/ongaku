<script setup lang="ts">
	import Header from './Header.vue';
	import EditableCoverImage from './EditableCoverImage.vue';
	import useCoverImageClient from './composables/useCoverImage.client';
	import type IImageObject from '~/interfaces/business/IImageObject';
	import PlaylistsService from '~/services/PlaylistsService';

	const { t } = useI18n();

	const createToast = inject<FCreateToast>('createToast', () => {});

	const props = defineProps<{
		id: string;
		name: string;
		descr?: string | null;
		image: IImageObject | null;
		isVisible: boolean;
	}>();
	const emit = defineEmits<{
		(e: 'closeForm'): void;
		(
			e: 'onEditSuccess',
			playlistId: string,
			newName: string,
			newDescr: string
		): void;
	}>();

	const name = ref(props.name || '');
	const descr = ref(props.descr || '');

	const {
		existingImage,
		localImageBase64,
		updateLocalImage,
		removeLocalImage,
	} = useCoverImageClient(props.image);

	const editPlaylist = async () => {
		try {
			await PlaylistsService.updatePlaylistNameOrDescr(
				props.id,
				name.value,
				descr.value
			);

			if (localImageBase64.value) {
				PlaylistsService.addCustomPlaylistCoverImage(
					props.id,
					localImageBase64.value
				);
			}

			createToast({
				id: props.id,
				type: 'success',
				message: t('toasts.playlists.update.success'),
				lifespan: 3000,
			});

			emit('onEditSuccess', props.id, name.value, descr.value);
		} catch (err) {
			console.error(err);
		}
	};

	provide('closeForm', () => emit('closeForm'));
</script>

<template>
	<div
		class="fixed inset-0 z-50 items-center justify-center bg-black bg-opacity-70"
		:class="{ flex: props.isVisible, hidden: !props.isVisible }"
		@click.self="emit('closeForm')"
	>
		<div class="mx-4 w-full max-w-3xl rounded-md bg-white p-4 dark:bg-zinc-900">
			<Header />

			<!-- Main box -->
			<div class="mb-2 flex w-full items-center justify-between gap-3">
				<!-- Add playlist image -->
				<EditableCoverImage
					:original-image="existingImage"
					:local-img-base64="localImageBase64"
					@update-image="updateLocalImage"
					@delete-image="removeLocalImage"
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
				@click="editPlaylist"
			>
				{{ $t('dictionary.save') }}
			</button>
		</div>
	</div>
</template>
