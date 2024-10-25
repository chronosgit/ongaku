<script setup lang="ts">
	const { recentPlaylists, fetchRecentPlaylists } = useRecentPlaylists();

	onMounted(() => fetchRecentPlaylists());
</script>

<template>
	<div class="py-4">
		<p class="text-lg font-medium text-black dark:text-white">
			Your recent playlists
		</p>

		<div class="grid grid-rows-2">
			<p v-for="p in recentPlaylists">
				{{ p }}
			</p>
		</div>
	</div>
</template>
