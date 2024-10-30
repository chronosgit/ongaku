<script setup lang="ts">
	import SkeletonTrackFeed from './skeletons/SkeletonTrackFeed.vue';
	import type ITrackFeedItem from '~/interfaces/business/tracks/ITrackFeedItem';

	const props = defineProps<{
		tracks: ITrackFeedItem[] | null;
		areTracksLoading: boolean;
	}>();
</script>

<template>
	<template v-if="props.areTracksLoading">
		<SkeletonTrackFeed />
	</template>

	<template v-else>
		{{ props.tracks }}
	</template>
</template>
