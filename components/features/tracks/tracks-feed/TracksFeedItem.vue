<script setup lang="ts">
	import { IconPlay, IconSettings } from '~/components/ui/icons';
	import type ITrackFeedItem from '~/interfaces/business/tracks/ITrackFeedItem';

	const props = defineProps<{ item: ITrackFeedItem; order: number }>();

	const artistsNames = computed(() => {
		const a = props.item.artists;

		return a.reduce((acc, a) => acc + ' ' + a.name, '').trim();
	});

	const formatDuration = (ms: number) => {
		const seconds = Math.floor(ms / 1000) % 60;
		const minutes = Math.floor(ms / (1000 * 60)) % 60;
		const hours = Math.floor(ms / (1000 * 60 * 60));

		if (hours > 0) {
			return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
		} else if (minutes > 0) {
			return `${minutes}:${String(seconds).padStart(2, '0')}`;
		} else {
			return `${seconds} sec`;
		}
	};
</script>

<template>
	<div
		class="group/tracks flex items-center justify-between gap-3 overflow-x-hidden rounded-md p-2 text-sm font-medium transition-colors hover:bg-zinc-300 dark:text-white dark:hover:bg-zinc-800"
	>
		<div class="flex w-10 grow-0 items-center justify-center">
			<p class="block group-hover/tracks:hidden">{{ props.order }}</p>

			<ClientOnly>
				<IconPlay
					class="hidden scale-150 cursor-pointer group-hover/tracks:block"
					@click.stop="console.log('Play track', props.item.name)"
				/>
			</ClientOnly>
		</div>

		<div
			class="flex basis-[100%] items-center gap-3 overflow-x-hidden sm:basis-[60%] md:basis-[50%]"
		>
			<NuxtImg
				v-if="Array.isArray(props.item.images) && props.item.images[0]"
				:src="props.item.images[0].url"
				placeholder="/placeholder.png"
				class="h-11 w-11 rounded-md"
				alt=""
			/>

			<div class="overflow-hidden truncate whitespace-nowrap">
				<p class="text-base">{{ props.item.name }}</p>

				<p class="text-zinc-500 dark:text-zinc-400">
					{{ artistsNames }}
				</p>
			</div>
		</div>

		<NuxtLink
			class="hidden cursor-pointer overflow-hidden text-zinc-500 underline-offset-2 hover:underline sm:block sm:basis-[40%] md:basis-[30%] dark:text-zinc-400"
			@click="console.log('Navigate to artist page'), props.item.album.name"
		>
			{{ props.item.album.name }}
		</NuxtLink>

		<p class="hidden text-zinc-500 md:block md:basis-[20%] dark:text-zinc-400">
			{{ props.item.added_at }}
		</p>

		<p class="w-20 grow-0 text-center text-zinc-500 dark:text-zinc-400">
			{{ formatDuration(props.item.duration_ms) }}
		</p>
	</div>
</template>
