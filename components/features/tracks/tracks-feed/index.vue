<script setup lang="ts">
	import SkeletonTrackFeed from '~/components/features/tracks/skeletons/SkeletonTrackFeed.vue';
	import TracksFeedItem from './TracksFeedItem.vue';
	import TracksFeedHeader from './TracksFeedHeader.vue';
	import type ITrackFeedItem from '~/interfaces/business/tracks/ITrackFeedItem';

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
			<TracksFeedHeader />

			<!-- Tracks -->
			<div class="mt-4 grid gap-1.5">
				<TracksFeedItem
					v-for="(t, i) in props.tracks"
					:item="t"
					:order="i + 1"
				/>
			</div>
		</template>
	</section>
</template>
