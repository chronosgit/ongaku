<script setup lang="ts">
	import SkeletonTrackFeed from '~/components/features/tracks/skeletons/SkeletonTrackFeed.vue';
	import FeedHeader from './components/header.vue';
	import FeedItem from './components/item/index.vue';
	import type ITrackFeedItem from '~/interfaces/business/tracks/ITrackFeedItem';

	const props = defineProps<{
		tracks: ITrackFeedItem[] | null;
		areTracksLoading: boolean;
		skeletonItemsTotal?: number;
	}>();

	watch(
		() => props.tracks,
		(n) => (tracks.value = n)
	);

	const tracks = ref(props.tracks);

	const locallyDeleteTrackFromFeed = (trackId: string) => {
		if (!tracks.value) return;

		const targetArrId = tracks.value.findIndex((t) => t.id === trackId);

		if (targetArrId == -1) return;

		tracks.value.splice(targetArrId, 1);
	};

	provide('locallyDeleteTrackFromFeed', locallyDeleteTrackFromFeed);
</script>

<template>
	<section class="h-full overflow-y-auto">
		<SkeletonTrackFeed
			v-if="props.areTracksLoading"
			:skeleton-items-total="props.skeletonItemsTotal"
		/>

		<!-- TODO: track feed item component -->
		<template v-else>
			<FeedHeader v-if="Array.isArray(tracks) && tracks.length" />

			<!-- Tracks -->
			<div class="mt-4 grid gap-1.5">
				<FeedItem
					v-for="(t, i) in tracks"
					:key="t.id"
					:item="t"
					:order="i + 1"
				/>
			</div>
		</template>
	</section>
</template>
