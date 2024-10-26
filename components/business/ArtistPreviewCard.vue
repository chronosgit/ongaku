<script setup lang="ts">
	import { IconPlay, IconQuestionMark } from '~/components/ui/icons';
	import type IArtist from '~/interfaces/IArtist';

	const props = defineProps<{
		artist: IArtist;
	}>();
</script>

<template>
	<article class="group rounded-md">
		<!-- Image container -->
		<div class="relative w-44 md:w-56">
			<!-- Cover image -->
			<NuxtImg
				v-if="Array.isArray(props.artist?.images) && props.artist.images[0]"
				:src="props.artist.images[0].url"
				class="rounded-full"
			/>

			<!-- Cover image placeholder -->
			<div
				v-else
				class="flex h-44 w-44 items-center justify-center rounded-full bg-zinc-300 md:h-56 md:w-56 dark:bg-zinc-700"
			>
				<ClientOnly>
					<IconQuestionMark
						class="scale-[300%] text-zinc-400 dark:text-zinc-500"
					/>
				</ClientOnly>
			</div>

			<!-- On-hover play button -->
			<!-- TODO: player -->
			<div
				class="absolute bottom-0 right-0 flex -translate-y-2 cursor-pointer items-center justify-center rounded-full bg-green-400 p-3 opacity-0 shadow-lg transition-all group-hover:-translate-y-4 group-hover:opacity-100 hover:scale-105 hover:bg-green-300"
				@click="console.log(`Play ${props.artist.name}`)"
			>
				<ClientOnly>
					<IconPlay class="scale-150" />
				</ClientOnly>
			</div>
		</div>

		<p class="mt-3 dark:text-white">{{ props.artist.name }}</p>

		<p class="mt-1 text-sm dark:text-zinc-400">
			{{ $t('dictionary.artist.one') || 'Artist' }}
		</p>
	</article>
</template>
