<script setup lang="ts">
	import TemplateLayoutPart from '~/components/utils/TemplateLayoutPart.vue';

	definePageMeta({
		title: 'Playlsit apge',
		layout: 'main',
	});

	const { params } = useRoute();

	const { playlist, isLoading, fetchPlaylist } = usePlaylist(
		params.id as string
	);

	onMounted(() => fetchPlaylist());
</script>

<template>
	<TemplateLayoutPart class="h-full p-3"> Palysits </TemplateLayoutPart>
</template>
