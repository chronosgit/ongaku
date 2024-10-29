<script setup lang="ts">
	import { IconLibrary, IconPlus } from '~/components/ui/icons';
	import Tooltip from '~/components/shared/Tooltip.vue';
	import { useLayoutStore } from '~/store/useLayoutStore';
	import PlaylistsService from '~/services/PlaylistsService';
	import { useCurrentUserStore } from '~/store/useCurrentUserStore';

	const createToast = inject<FCreateToast>('createToast', () => {});
	const extendMediaItems = inject<(item: any) => void>(
		'extendMediaItems',
		() => {}
	);

	const { t } = useI18n();

	const curUserStore = useCurrentUserStore();
	const layoutStore = useLayoutStore();

	const createNewPlaylist = async () => {
		try {
			const { data: createdPlaylist } =
				await PlaylistsService.createNewPlaylistForUser(
					curUserStore.user?.id || '',
					t('modules.sidebar-library.opened.new-playlist-#')
				);

			createdPlaylist.owner.display_name = curUserStore.user?.display_name;

			createToast({
				id: generateRandomString(10),
				type: 'success',
				message: t('modules.sidebar-library.toasts.success-create-playlist'),
				lifespan: 3000,
			});
			extendMediaItems(createdPlaylist);
		} catch (err) {
			console.error(err);
		}
	};
</script>

<template>
	<div class="mb-4 flex items-center justify-between">
		<!-- Shrink library -->
		<div
			class="group flex cursor-pointer items-center gap-2 text-zinc-400 hover:text-indigo-500"
			@click="layoutStore.closeLeftSide"
		>
			<ClientOnly>
				<IconLibrary
					class="scale-150 transition-colors group-hover:text-indigo-500"
				/>
			</ClientOnly>

			<p
				class="text-lg font-semibold transition-colors group-hover:text-indigo-500"
			>
				{{ $t('modules.sidebar-library.opened.my-library') }}
			</p>
		</div>

		<!-- Create playlist -->
		<div class="relative">
			<IconPlus
				class="peer scale-150 cursor-pointer text-gray-400 transition-colors hover:text-indigo-500"
				@click="createNewPlaylist"
			/>

			<Tooltip
				class="bottom-0 w-max -translate-y-7 opacity-0 transition-opacity peer-hover:opacity-100"
			>
				{{ $t('modules.sidebar-library.opened.add-playlist-tooltip') }}
			</Tooltip>
		</div>
	</div>
</template>
