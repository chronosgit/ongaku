<script setup lang="ts">
	import { usePlayerStore } from '~/store/usePlayerStore';

	const playerStore = usePlayerStore();
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

	<div v-else class="flex h-10 w-full items-center gap-1">
		<div class="h-8 w-8 rounded-md bg-zinc-300"></div>

		<div class="h-4 w-1/2 rounded-sm bg-zinc-300"></div>
	</div>
</template>
