<script setup lang="ts">
	import { usePlayerStore } from '~/store/usePlayerStore';

	const playerStore = usePlayerStore();

	watchEffect(() => console.log(playerStore.curItem));
</script>

<template>
	<div v-if="playerStore.curItem != null" class="flex items-center gap-1">
		<NuxtImg
			:src="playerStore.curItem?.album?.images[0]?.url"
			class="max-w-10 rounded-md"
		/>

		<div class="space-y-0 overflow-hidden">
			<p class="truncate whitespace-nowrap">
				{{ playerStore.curItem.name }}
			</p>

			<NuxtLink
				v-if="playerStore.curItem.artists[0]"
				:href="playerStore.curItem.artists[0].href"
			>
				{{ playerStore.curItem.artists[0].name }}
			</NuxtLink>
		</div>
	</div>
</template>
