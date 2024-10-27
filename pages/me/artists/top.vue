<script setup lang="ts">
	import ArtistPreviewCard from '~/components/business/ArtistPreviewCard.vue';
	import SkeletonArtistPreviewCard from '~/components/business/skeletons/SkeletonArtistPreviewCard.vue';
	import TemplateLayoutPart from '~/components/utils/TemplateLayoutPart.vue';

	useMyProfile();

	definePageMeta({
		title: '/me/artists/top.meta.title',
		layout: 'main',
	});

	const { myTopArtists, isLoading, fetchMyTopArtists } = useMyTopArtists();

	onMounted(() => fetchMyTopArtists());
</script>

<template>
	<TemplateLayoutPart
		class="h-full px-3 pt-8 scrollbar scrollbar-thumb-zinc-300 scrollbar-thumb-rounded-md scrollbar-w-2 dark:scrollbar-thumb-zinc-800"
		:class="{ 'overflow-hidden': isLoading, 'overflow-y-auto': !isLoading }"
	>
		<p class="text-3xl font-medium dark:text-white">Favourite artists</p>

		<!-- Artists container -->
		<div
			class="mt-8 grid grid-cols-1 place-items-center gap-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
		>
			<SkeletonArtistPreviewCard
				v-if="isLoading"
				v-for="i in 12"
				:key="i"
				class="h-64 w-64 md:h-52 md:w-52 lg:h-40 lg:w-40"
			/>

			<ArtistPreviewCard
				v-else
				v-for="a in myTopArtists"
				:key="a.id"
				:artist="a"
				class="w-72 shrink-0 sm:w-64 md:w-56 lg:w-44"
			/>
		</div>
	</TemplateLayoutPart>
</template>
