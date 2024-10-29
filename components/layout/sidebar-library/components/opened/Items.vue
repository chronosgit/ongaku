<script setup lang="ts">
	import ItemsSkeleton from './ItemsSkeleton.vue';
	import Item from './Item.vue';
	import type IMediaItem from '../../interfaces/IMediaItem';

	const mediaItems = inject<IMediaItem[] | null>('mediaItems', null);
	const areMediaItemsLoading = inject<boolean>('areMediaItemsLoading');
</script>

<template>
	<!-- Loading indicator -->
	<ItemsSkeleton v-if="areMediaItemsLoading" />

	<!-- After loading -->
	<template v-else>
		<!-- Items -->
		<div v-if="mediaItems" class="flex flex-col gap-1">
			<Item v-for="i in mediaItems" :key="i.id" :item="i" />
		</div>

		<!-- No items -->
		<p v-else>
			<span>{{ $t('modules.sidebar-library.opened.no-items') }}</span>
		</p>
	</template>
</template>
