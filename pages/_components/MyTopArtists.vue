<script setup lang="ts">
	import ArtistPreviewCard from '~/components/business/ArtistPreviewCard.vue';
	import SkeletonArtistPreviewCard from '~/components/business/SkeletonArtistPreviewCard.vue';

	const localePath = useLocalePath();

	const { myTopArtists, isLoading, fetchMyTopArtists } = useMyTopArtists();

	onMounted(() => fetchMyTopArtists());
</script>

<template>
	<!-- Section name -->
	<div class="flex items-center justify-between gap-1">
		<p class="text-lg font-medium dark:text-white">
			{{ $t('/.my-top-artists.title') }}
		</p>

		<!-- TODO: update link -->
		<NuxtLink
			:to="localePath('/')"
			class="text-sm underline-offset-2 hover:underline dark:text-white"
		>
			{{ $t('/.my-top-artists.link-show-all') }}
		</NuxtLink>
	</div>

	<!-- Container -->
	<div
		class="mt-4 flex w-full shrink-0 items-center gap-8 overflow-y-auto pb-4 transition-transform scrollbar scrollbar-thumb-zinc-300 scrollbar-thumb-rounded-md scrollbar-h-2 dark:scrollbar-thumb-zinc-800"
	>
		<!-- Skeletons -->
		<SkeletonArtistPreviewCard v-if="isLoading" v-for="i in 8" :key="i" />

		<!-- After loading -->
		<ArtistPreviewCard
			v-else-if="Array.isArray(myTopArtists) && myTopArtists.length"
			v-for="a in myTopArtists"
			:artist="a"
		/>

		<!--Artists not found -->
		<p v-else class="pt-2 font-medium dark:text-white">
			{{ $t('/.my-top-artists.artists-404') }}
		</p>
	</div>
</template>
