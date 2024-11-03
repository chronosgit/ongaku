<script setup lang="ts">
	import Tooltip from '~/components/shared/Tooltip.vue';
	import { IconCheck, IconPlus } from '~/components/ui/icons';
	import PlaylistsService from '~/services/PlaylistsService';

	const createToast = inject<FCreateToast>('createToast', () => {});

	const { t } = useI18n();
	const {
		params: { id: playlistId },
	} = useRoute();

	const isPlaylistFollowed = ref<boolean | null>(null);

	const followPlaylist = async () => {
		try {
			await PlaylistsService.followPlaylist(playlistId as string);

			isPlaylistFollowed.value = true;

			createToast({
				id: playlistId + new Date().toString(),
				type: 'success',
				message: t('toasts.playlists.follow.success'),
				lifespan: 3000,
			});
		} catch (err) {
			console.error(err);

			createToast({
				id: playlistId + new Date().toString(),
				type: 'error',
				message: t('toasts.playlists.follow.error'),
				lifespan: 3000,
			});
		}
	};

	const unfollowPlaylist = async () => {
		try {
			await PlaylistsService.unfollowPlaylist(playlistId as string);

			isPlaylistFollowed.value = false;

			createToast({
				id: playlistId + new Date().toString(),
				type: 'success',
				message: t('toasts.playlists.unfollow.success'),
				lifespan: 3000,
			});
		} catch (err) {
			console.error(err);

			createToast({
				id: playlistId + new Date().toString(),
				type: 'error',
				message: t('toasts.playlists.unfollow.error'),
				lifespan: 3000,
			});
		}
	};

	// Check if current user already follows
	watch(
		() => playlistId,
		async (id) => {
			const { data: condArr } =
				await PlaylistsService.checkIfCurUserFollowsPlaylist(id as string);

			isPlaylistFollowed.value = Array.isArray(condArr) && condArr[0];
		},
		{ immediate: true }
	);
</script>

<template>
	<ClientOnly v-if="isPlaylistFollowed === true">
		<div class="relative">
			<div
				class="peer relative flex cursor-pointer items-center justify-center rounded-full bg-indigo-400 p-2"
				@click="unfollowPlaylist"
			>
				<IconCheck class="scale-150 text-white" />
			</div>

			<Tooltip
				class="-translate-x-3/4 -translate-y-16 cursor-default opacity-0 transition-all peer-hover:opacity-100"
			>
				{{ $t('dictionary.unfollow') }}
			</Tooltip>
		</div>
	</ClientOnly>

	<ClientOnly v-if="isPlaylistFollowed === false">
		<div class="relative">
			<IconPlus
				class="peer scale-150 cursor-pointer transition-colors hover:text-indigo-600 dark:text-white"
				@click="followPlaylist"
			/>

			<Tooltip
				class="-translate-x-[90%] -translate-y-16 cursor-default opacity-0 transition-opacity peer-hover:opacity-100"
			>
				{{ $t('dictionary.follow') }}
			</Tooltip>
		</div>
	</ClientOnly>
</template>
