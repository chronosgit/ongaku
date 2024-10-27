<script setup lang="ts">
	import ArtistPreviewCard from '~/components/business/ArtistPreviewCard.vue';
	import SkeletonArtistPreviewCard from '~/components/business/skeletons/SkeletonArtistPreviewCard.vue';

	const localePath = useLocalePath();

	const { myTopArtists, isLoading, fetchMyTopArtists } = useMyTopArtists();

	onMounted(() => fetchMyTopArtists());
</script>

<template>
	<section class="group/section">
		<!-- Section name -->
		<div class="flex items-center justify-between gap-1">
			<p class="text-lg font-medium dark:text-white">
				{{ $t('/.my-top-artists.title') }}
			</p>

			<NuxtLink
				v-if="!isLoading"
				:to="localePath('/me/artists/top')"
				class="text-sm underline-offset-2 hover:underline dark:text-white"
			>
				{{ $t('/.my-top-artists.link-show-all') }}
			</NuxtLink>
		</div>

		<!-- Container -->
		<div
			class="mt-4 flex items-center gap-8 pb-4 transition-colors scrollbar scrollbar-thumb-rounded-md scrollbar-h-2 group-hover/section:scrollbar-thumb-zinc-300 dark:group-hover/section:scrollbar-thumb-zinc-800"
			:class="{ 'overflow-hidden': isLoading, 'overflow-x-auto': !isLoading }"
		>
			<!-- Skeletons -->
			<SkeletonArtistPreviewCard
				v-if="isLoading"
				v-for="i in 8"
				:key="i"
				class="h-44 w-44 shrink-0 md:h-56 md:w-56"
			/>

			<!-- After loading -->
			<ArtistPreviewCard
				v-else-if="Array.isArray(myTopArtists) && myTopArtists.length"
				v-for="a in myTopArtists"
				:artist="a"
				class="w-44 shrink-0"
			/>

			<!--Artists not found -->
			<p v-else class="pt-2 font-medium dark:text-white">
				{{ $t('/.my-top-artists.artists-404') }}
			</p>
		</div>
	</section>
</template>
