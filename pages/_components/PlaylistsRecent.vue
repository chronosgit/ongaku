<script setup lang="ts">
	import { IconPlay } from '~/components/ui/icons';

	const localePath = useLocalePath();

	const { recentPlaylists, areLoading } = useRecentPlaylists();
</script>

<template>
	<section class="py-4">
		<!-- Heading -->
		<p class="text-lg font-medium text-black dark:text-white">
			{{ $t('/.playlists-recent.your-recent-playlists') }}
		</p>

		<!-- Container for playlists -->
		<div class="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
			<!-- Loading indicator -->
			<div
				v-if="areLoading"
				v-for="_ in 8"
				class="flex animate-pulse items-center gap-2 overflow-hidden rounded-md bg-zinc-300 dark:bg-zinc-700"
			>
				<div class="h-14 w-14 bg-zinc-400 dark:bg-zinc-600"></div>
				<div class="h-4 w-1/2 rounded-sm bg-zinc-400 dark:bg-zinc-600"></div>
			</div>

			<!-- Display recent playlists -->
			<div
				v-else
				v-for="p in recentPlaylists"
				class="transition-custom group relative flex cursor-pointer items-center justify-between gap-2 overflow-hidden rounded-md bg-zinc-300 bg-opacity-50 hover:bg-opacity-80 dark:bg-zinc-700"
				@click="navigateTo(localePath(`/playlists/${p.id}`))"
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

				<div
					class="absolute right-0 mr-2 hidden items-center justify-center rounded-full bg-green-400 p-2 shadow-md transition-all group-hover:flex hover:scale-105 hover:bg-green-300"
					@click.stop="console.log('Play ', p.name)"
				>
					<ClientOnly>
						<IconPlay class="scale-150" />
					</ClientOnly>
				</div>
			</div>
		</div>
	</section>
</template>

<style scoped>
	.transition-custom {
		transition: all 0.3s ease;
	}
</style>
