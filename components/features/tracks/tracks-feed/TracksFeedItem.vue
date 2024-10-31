<script setup lang="ts">
	import { IconPlay } from '~/components/ui/icons';
	import TrackFeedItemContext from './TrackFeedItemContext.vue';
	import type ITrackFeedItem from '~/interfaces/business/tracks/ITrackFeedItem';

	const props = defineProps<{ item: ITrackFeedItem; order: number }>();

	const { coords, isOpened, toggleCtxMenu } = useBaseContextMenu(
		`tracks-feed-item-${props.item.id}`
	);

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
		:ref="`tracks-feed-item-${props.item.id}`"
		class="group/tracks flex items-center justify-between gap-1 overflow-x-hidden rounded-md p-2 text-sm font-medium transition-colors hover:bg-zinc-300 hover:bg-opacity-50 dark:text-white dark:hover:bg-zinc-800"
		@contextmenu.prevent="toggleCtxMenu($event)"
	>
		<!-- Right-click absolute toggleable context menu -->
		<TrackFeedItemContext :is-visible="isOpened" :coords="coords" />

		<!-- Order number or play button -->
		<div class="flex w-10 grow-0 items-center justify-center">
			<p class="block group-hover/tracks:hidden">{{ props.order }}</p>

			<ClientOnly>
				<IconPlay
					class="hidden scale-150 cursor-pointer group-hover/tracks:block"
					@click.stop="console.log('Play track', props.item.name)"
				/>
			</ClientOnly>
		</div>

		<!-- Cover image, name and artists -->
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

		<!-- Album name (w/ link) -->
		<NuxtLink
			class="hidden cursor-pointer overflow-hidden text-zinc-500 underline-offset-2 hover:underline sm:block sm:basis-[40%] md:basis-[30%] dark:text-zinc-400"
			@click="console.log('Navigate to artist page'), props.item.album.name"
		>
			{{ props.item.album.name }}
		</NuxtLink>

		<!-- Added at -->
		<p class="hidden text-zinc-500 md:block md:basis-[20%] dark:text-zinc-400">
			{{ props.item.added_at }}
		</p>

		<!-- Duration -->
		<p class="w-20 grow-0 text-center text-zinc-500 dark:text-zinc-400">
			{{ formatDuration(props.item.duration_ms) }}
		</p>
	</div>
</template>
