<script setup lang="ts">
	import type ITrackFeedItem from '~/interfaces/business/tracks/ITrackFeedItem';

	const props = defineProps<{ item: ITrackFeedItem }>();
</script>

<template>
	<div class="">{{ props.item.name }}</div>
</template>
