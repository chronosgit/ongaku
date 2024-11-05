<script setup lang="ts">
	import { IconClose } from '~/components/ui/icons';
	import TracksService from '~/services/TracksService';
	import { useCurrentUserStore } from '~/store/useCurrentUserStore';

	const createToast = inject<FCreateToast>('createToast', () => {});

	const { t } = useI18n();

	const curUserStore = useCurrentUserStore();

	const props = defineProps<{ trackId: string }>();
	const emit = defineEmits<{
		(e: 'openOverlay'): void;
		(e: 'closeOverlay'): void;
	}>();

	const { playlists } = useMyFollowedPlaylists();

	const ownPlaylists = computed(() => {
		if (playlists.value == null) return null;

		return playlists.value.filter((p) => {
			return p.owner.id === curUserStore.user?.id;
		});
	});

	const onAddClick = async (playlistId: string) => {
		try {
			await TracksService.addTrackToPlaylist(playlistId, [
				`spotify:track:${props.trackId}`,
			]);

			createToast({
				id: props.trackId + new Date().toString(),
				type: 'warn',
				message: t('toasts.tracks.add-to-playlist.warn'),
				lifespan: 3000,
			});

			emit('closeOverlay');
		} catch (err) {
			console.log(err);

			createToast({
				id: props.trackId + new Date().toString(),
				type: 'error',
				message: t('toasts.tracks.add-to-playlist.error'),
				lifespan: 3000,
			});
		}
	};
</script>

<template>
	<Teleport to="body">
		<div
			class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
		>
			<div class="h-1/3 w-full max-w-[50%] space-y-2 rounded-md bg-white p-2">
				<div class="mb-4 flex items-center justify-between gap-2 px-2">
					<p class="font-bold">Add to playlist</p>

					<button
						class="group/btn flex items-center justify-center"
						@click="emit('closeOverlay')"
					>
						<ClientOnly>
							<IconClose
								class="scale-150 transition-colors group-hover/btn:text-indigo-500"
							/>
						</ClientOnly>
					</button>
				</div>

				<div
					class="max-h-[90%] overflow-y-auto overflow-x-hidden pr-1 scrollbar-thin scrollbar-thumb-zinc-300 scrollbar-thumb-rounded-md scrollbar-w-4"
				>
					<div
						v-for="p in ownPlaylists"
						class="flex cursor-pointer items-center justify-between gap-1 p-2 transition-colors hover:bg-zinc-200"
						@mousedown.stop="onAddClick(p.id)"
					>
						<p>{{ p.name }}</p>
					</div>
				</div>
			</div>
		</div>
	</Teleport>
</template>
