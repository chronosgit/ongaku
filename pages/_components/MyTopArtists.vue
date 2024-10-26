<script setup lang="ts">
	const { myTopArtists, isLoading, fetchMyTopArtists } = useMyTopArtists();

	onMounted(() => fetchMyTopArtists());
</script>

<template>
	<p class="text-lg font-medium dark:text-white">
		{{ $t('/.my-top-artists.title') }}
	</p>

	<!-- Container -->
	<div class="flex w-full items-center gap-4">
		<!-- Skeletons -->
		<div v-if="isLoading" class=""></div>

		<!-- After loading -->
		<div
			v-else-if="Array.isArray(myTopArtists) && myTopArtists.length"
			class=""
		>
			Artists here
		</div>

		<!--Artists not found -->
		<p v-else class="pt-2 font-medium dark:text-white">
			{{ $t('/.my-top-artists.artists-404') }}
		</p>
	</div>
</template>
