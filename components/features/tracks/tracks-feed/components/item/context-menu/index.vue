<script setup lang="ts">
	import {
		IconAlbum,
		IconArrowDown,
		IconDelete,
		IconPlus,
	} from '~/components/ui/icons';
	import ContextMenuItem from './item.vue';
	import TracksService from '~/services/TracksService';
	import type ITrackFeedItem from '~/interfaces/business/tracks/ITrackFeedItem';

	const createToast = inject<FCreateToast>('createToast', () => {});
	const locallyDeleteTrackFromFeed = inject<(trackId: string) => void>(
		'locallyDeleteTrackFromFeed',
		() => {}
	);

	const { t } = useI18n();

	const props = defineProps<{
		item: ITrackFeedItem;
		coords: { x: number | null; y: number | null };
		isVisible: boolean;
	}>();
	const emit = defineEmits<{ (e: 'closeContextMenu'): void }>();

	const deleteTrackFromFeed = async () => {
		try {
			if (props.item?.context?.is_ownership) {
				emit('closeContextMenu');

				await TracksService.removeTrackFromPlaylist(props.item.context.id, [
					{ uri: props.item.uri },
				]);

				locallyDeleteTrackFromFeed(props.item.id);

				createToast({
					id: props.item.id + new Date().toString(),
					type: 'success',
					message: t('toasts.tracks.delete-from-playlist.success'),
					lifespan: 3000,
				});

				return;
			}
		} catch (err) {
			console.error(err);

			createToast({
				id: props.item.id + new Date().toString(),
				type: 'error',
				message: t('toasts.tracks.delete-from-playlist.error'),
				lifespan: 3000,
			});
		} finally {
			emit('closeContextMenu');
		}
	};

	// Disable scrolling when a context menu is opened
	watch(
		() => props.isVisible,
		(v) => {
			if (import.meta.server) return;

			const box = document.getElementById(
				'/playlists/:id.layout-part-container'
			);

			if (box == null) return;

			console.log(box);

			box.style.pointerEvents = v ? 'none' : '';
		}
	);
</script>

<template>
	<Teleport to="body">
		<div
			class="absolute space-y-2 overflow-y-auto text-nowrap rounded-md bg-zinc-300 p-1 font-medium dark:bg-zinc-800 dark:text-white"
			:class="{
				block: props.isVisible,
				hidden: !props.isVisible,
			}"
			:style="{ top: props.coords.y + 'px', left: props.coords.x + 'px' }"
		>
			<!-- 'Add to playlist's dropdown -->
			<!-- TODO: ... -->

			<!-- Add to playlist -->
			<ContextMenuItem>
				<div class="flex items-center gap-1.5">
					<LazyClientOnly>
						<IconPlus class="scale-125" />
					</LazyClientOnly>

					<p>
						{{ $t('modules.tracks-feed.context-menu.add-to-playlist') }}
					</p>
				</div>

				<LazyClientOnly>
					<IconArrowDown class="-rotate-90 opacity-0 group-hover:opacity-100" />
				</LazyClientOnly>
			</ContextMenuItem>

			<!-- Delete from this playlist (if own, I guess) -->
			<ContextMenuItem
				v-if="props.item.context.is_ownership"
				@mousedown.stop="deleteTrackFromFeed()"
			>
				<div class="flex items-center gap-1.5">
					<LazyClientOnly>
						<IconDelete />
					</LazyClientOnly>

					<p>
						{{
							$t('modules.tracks-feed.context-menu.delete-from-this-playlist')
						}}
					</p>
				</div>
			</ContextMenuItem>

			<!-- Navigate to album -->
			<ContextMenuItem
				@mousedown.stop="
					console.log(`Navigate to album: ${props.item.album.name}`)
				"
			>
				<div class="flex items-center gap-1.5">
					<LazyClientOnly>
						<IconAlbum />
					</LazyClientOnly>

					<p>
						{{ $t('modules.tracks-feed.context-menu.navigate-to-album') }}
					</p>
				</div>
			</ContextMenuItem>
		</div>
	</Teleport>
</template>
