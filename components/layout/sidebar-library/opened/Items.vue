<script setup lang="ts">
	import ItemsSkeleton from './ItemsSkeleton.vue';
	import Item from './Item.vue';
	import type IMediaAlbumOrPlaylist from '~/interfaces/IMediaAlbumOrPlaylist';

	const props = defineProps<{
		items: IMediaAlbumOrPlaylist[] | null;
		isLoading: boolean;
	}>();
</script>

<template>
	<!-- Loading indicator -->
	<ItemsSkeleton v-if="props.isLoading" />

	<!-- After loading -->
	<template v-else>
		<!-- Items -->
		<div v-if="props.items" class="flex flex-col gap-1">
			<Item v-for="i in props.items" :key="i.id" :item="i" />
		</div>

		<!-- No items -->
		<!-- TODO: update message if filters -->
		<p v-else>
			<span>{{ $t('modules.sidebar-library.opened.no-items') }}</span>
		</p>
	</template>
</template>
