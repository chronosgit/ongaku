<script setup lang="ts">
	import Filters from './Filters.vue';
	import Header from './Header.vue';
	import Items from './Items.vue';

	const areMediaItemsLoading = inject<boolean>('areMediaItemsLoading');
</script>

<template>
	<div class="h-full px-4">
		<Header />

		<Filters v-if="!areMediaItemsLoading" class="mb-4" />

		<!-- Media items -->
		<div
			class="max-h-[39rem] overflow-x-hidden scrollbar scrollbar-thumb-gray-300 scrollbar-thumb-rounded-lg scrollbar-w-1 dark:scrollbar-thumb-[#1d1d1d]"
			:class="areMediaItemsLoading ? 'overflow-y-hidden' : 'overflow-y-auto'"
		>
			<Items />
		</div>
	</div>
</template>
