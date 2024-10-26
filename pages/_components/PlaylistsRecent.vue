<script setup lang="ts">
	import { IconPlay } from '~/components/ui/icons';

	const { recentPlaylists, isLoading, fetchRecentPlaylists } =
		useRecentPlaylists();

	onMounted(() => fetchRecentPlaylists());
</script>

<template>
	<div class="py-4">
		<p class="text-lg font-medium text-black dark:text-white">
			Your recent playlists
		</p>

		<div class="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
			<!-- Skeletons -->
			<div
				v-if="isLoading"
				v-for="_ in 8"
				class="flex animate-pulse items-center gap-2 overflow-hidden rounded-md bg-zinc-300 dark:bg-zinc-700"
			>
				<div class="h-14 w-14 bg-zinc-400 dark:bg-zinc-600"></div>

				<div class="h-4 w-1/2 rounded-sm bg-zinc-400 dark:bg-zinc-600"></div>
			</div>

			<!-- Playlists -->
			<div
				v-else
				v-for="p in recentPlaylists"
				class="transition-custom group relative flex cursor-pointer items-center justify-between gap-2 overflow-hidden rounded-md bg-zinc-300 bg-opacity-50 hover:bg-opacity-80 dark:bg-zinc-700"
			>
				<div class="flex w-full items-center gap-2">
					<NuxtImg
						v-if="Array.isArray(p.images) && p.images[0]?.url"
						:src="p.images[0].url"
						class="max-h-14 max-w-14"
					/>

					<p
						class="overflow-hidden text-ellipsis whitespace-nowrap font-medium dark:text-white"
					>
						{{ p.name }}
					</p>
				</div>

				<!-- Play icon -->
				<div
					class="absolute right-0 mr-2 hidden items-center justify-center rounded-full bg-green-400 p-2 shadow-md group-hover:flex"
				>
					<IconPlay class="scale-150" />
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
	.transition-custom {
		transition: all 0.3s ease;
	}
</style>
