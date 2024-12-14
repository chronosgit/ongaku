<script setup lang="ts">
	import LayoutPartContainer from '~/components/layout/LayoutPartContainer.vue';

	const { path } = useRoute();
	const q = computed(() => path.split('/').filter(Boolean)[2]);

	definePageMeta({ layout: 'main' });

	const { data, isLoading } = useSearch(q.value, ['album']);
</script>

<template>
	<LayoutPartContainer>
		<p>{{ data }}</p>
	</LayoutPartContainer>
</template>
