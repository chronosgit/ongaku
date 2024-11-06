<script setup lang="ts">
	import SearchbarClassic from '~/components/features/search/searchbar-classic/index.vue';
	import Heading from './components/heading.vue';
</script>

<template>
	<section>
		<Heading />

		<div class="mt-4 px-2">
			<SearchbarClassic />
		</div>
	</section>
</template>
