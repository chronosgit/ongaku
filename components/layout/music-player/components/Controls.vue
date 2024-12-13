<script setup lang="ts">
	import {
		IconPause,
		IconPlay,
		IconSkipToNext,
		IconSkipToPrev,
	} from '~/components/ui/icons';
	import { usePlayerStore } from '~/store/usePlayerStore';

	const playerStore = usePlayerStore();
</script>

<template>
	<div class="flex items-center gap-3">
		<!-- Skip to the previous track -->
		<ClientOnly>
			<button class="flex items-center justify-between">
				<IconSkipToPrev
					class="scale-150 dark:text-white"
					@click="playerStore.skipToPrevTrack"
				/>
			</button>
		</ClientOnly>

		<!-- Play/Pause -->
		<ClientOnly v-if="playerStore.isPlaying">
			<button
				class="flex items-center justify-between"
				@click="playerStore.pausePlaying"
			>
				<IconPause class="scale-150 dark:text-white" />
			</button>
		</ClientOnly>

		<ClientOnly v-else>
			<button
				class="flex items-center justify-between"
				@click="playerStore.resumePlaying"
			>
				<IconPlay class="scale-150 dark:text-white" />
			</button>
		</ClientOnly>

		<!-- Skip to the next track -->
		<ClientOnly>
			<button class="flex items-center justify-between">
				<IconSkipToNext
					class="scale-150 dark:text-white"
					@click="playerStore.skipToNextTrack"
				/>
			</button>
		</ClientOnly>
	</div>
</template>
