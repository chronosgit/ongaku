<script setup lang="ts">
	import SkeletonTrackFeed from '../skeletons/SkeletonTrackFeed.vue';
	import type ITrackFeedItem from '~/interfaces/business/tracks/ITrackFeedItem';
	import TrackFeedItem from './TrackFeedItem.vue';

	const props = defineProps<{
		tracks: ITrackFeedItem[] | null;
		areTracksLoading: boolean;
		skeletonItemsTotal?: number;
	}>();
</script>

<template>
	<section>
		<SkeletonTrackFeed
			v-if="props.areTracksLoading"
			:skeleton-items-total="props.skeletonItemsTotal"
		/>

		<!-- TODO: track feed item component -->
		<template v-else>
			<!-- Table header -->
			<div class="flex justify-between gap-1 text-center">
				<!-- Order number -->
				<span class="basis-[5%] items-center bg-red-400">#</span>

				<!-- Name -->
				<p class="basis-[85%] bg-red-400">Name</p>

				<!-- Album -->
				<p class="bg-red-400">Album</p>

				<p class="bg-red-400">Added at</p>

				<!-- Duration -->
				<span class="basis-[10%] bg-red-400 text-center">O</span>
			</div>

			<!-- Tracks -->
			<div class="grid gap-1.5">
				<TrackFeedItem v-for="t in props.tracks" :item="t" />
			</div>
		</template>
	</section>
</template>
