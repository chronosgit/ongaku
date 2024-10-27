<script setup lang="ts">
	import TemplateLayoutPart from '~/components/utils/TemplateLayoutPart.vue';

	definePageMeta({
		title: 'Playlsit apge',
	});

	const playlistId = ref<string | null>(null);
	const { params } = useRoute();

	console.log(params);
</script>

<template>
	<TemplateLayoutPart> Palysits </TemplateLayoutPart>
</template>
