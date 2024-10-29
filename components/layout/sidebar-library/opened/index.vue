<script setup lang="ts">
	import Header from './Header.vue';
</script>

<template>
	<div class="h-full px-4">
		<Header />

		<!-- <Filters
			v-if="!props.isLoading"
			class="mb-4"
			:filter="filter"
			@select-only-albums="emit('selectOnlyAlbums')"
			@select-only-playlists="emit('selectOnlyPlaylists')"
			@deselect-filters="emit('deselectFilters')"
		/> -->

		<!-- Media items -->
		<!-- <div
			class="max-h-[39rem] overflow-x-hidden scrollbar scrollbar-thumb-gray-300 scrollbar-thumb-rounded-lg scrollbar-w-1 dark:scrollbar-thumb-[#1d1d1d]"
			:class="props.isLoading ? 'overflow-y-hidden' : 'overflow-y-auto'"
		>
			<Items :items="props.items" :is-loading="isLoading" />
		</div> -->
	</div>
</template>
