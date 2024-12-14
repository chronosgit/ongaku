<script setup lang="ts">
	import { IconQuestionMark, IconPlay } from '~/components/ui/icons';
	import type IArtistObject from '~/interfaces/business/artists/IArtistObject';
	import PlayerService from '~/services/PlayerService';

	const props = defineProps<{
		artist: IArtistObject;
	}>();

	const playTopArtist = () => {
		PlayerService.startOrResumePlayback(`spotify:artist:${props.artist.id}`);
	};
</script>

<template>
	<article
		class="group min-h-20 min-w-20 cursor-pointer rounded-md p-3 transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-800"
		@click="console.log('Navigate to artist page')"
	>
		<!-- Image container -->
		<div class="relative">
			<!-- Cover image -->
			<NuxtImg
				v-if="Array.isArray(props.artist?.images) && props.artist.images[0]"
				:src="props.artist.images[0].url"
				class="h-full max-h-64 w-full max-w-64 rounded-full"
			/>

			<!-- Cover image placeholder -->
			<div
				v-else
				class="flex h-full w-full items-center justify-center rounded-full bg-zinc-300 dark:bg-zinc-700"
			>
				<ClientOnly>
					<IconQuestionMark
						class="scale-[300%] text-zinc-400 dark:text-zinc-500"
					/>
				</ClientOnly>
			</div>

			<!-- On-hover play button -->
			<div
				class="absolute bottom-0 right-0 flex -translate-y-2 cursor-pointer items-center justify-center rounded-full bg-green-400 p-3 opacity-0 shadow-lg transition-all group-hover:-translate-y-4 group-hover:opacity-100 hover:scale-105 hover:bg-green-300"
				@click="playTopArtist"
			>
				<ClientOnly>
					<IconPlay class="scale-150" />
				</ClientOnly>
			</div>
		</div>

		<NuxtLink
			class="mt-2 block font-medium underline-offset-2 hover:underline dark:text-white"
			@click.stop="console.log('Link navigate to artist page')"
		>
			{{ props.artist.name }}
		</NuxtLink>

		<p class="mt-1 text-sm dark:text-zinc-400">
			{{ $t('dictionary.artist.one') || 'Artist' }}
		</p>
	</article>
</template>
