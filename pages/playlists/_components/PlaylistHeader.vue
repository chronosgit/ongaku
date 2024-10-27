<script setup lang="ts">
	import PlaylistCover from './PlaylistCover.vue';
	import PlaylistTracksInfo from './PlaylistTracksInfo.vue';
	import type IPlaylist from '../interfaces/IPlaylist';

	const props = defineProps<{
		playlist: IPlaylist | null;
		playlistOwnerAvatar: string | null;
		playlistLengthMs: number | null;
	}>();

	const localePath = useLocalePath();
	const { t } = useI18n();

	const playlistNameSize = computed(() => {
		const l = Number(props.playlist?.name.length);

		if (l <= 30) {
			return 'text-3xl md:text-5xl lg:text-6xl';
		} else if (l <= 50) {
			return 'text-lg xs:text-xl md:text-4xl lg:text-5xl';
		} else {
			return 'text-md xs:text-lg ';
		}
	});
</script>

<template>
	<section
		class="rounded-inherit bg-zinc-200 p-4 dark:bg-zinc-700"
		:style="{
			'border-top-left-radius': 'inherit',
			'border-top-right-radius': 'inherit',
		}"
	>
		<p v-if="props.playlist == null" class="text-4xl font-bold dark:text-white">
			Not found
		</p>

		<!-- Existing playlist -->
		<div v-else class="flex items-end gap-4">
			<PlaylistCover />

			<div class="space-y-3">
				<p class="text-sm dark:text-white">
					{{ $t(`dictionary.${props.playlist.type}.one`) || 'Media' }}
				</p>

				<h2
					class="break-words break-all font-extrabold dark:text-white"
					:class="playlistNameSize"
				>
					{{ props.playlist.name }}
				</h2>

				<!-- Description -->
				<p class="text-sm font-medium text-zinc-600 dark:text-zinc-400">
					{{ props.playlist.description }}
				</p>

				<!-- Owner and tracks info -->
				<div class="flex items-center gap-1 text-sm font-medium">
					<!-- Owner avatar  -->
					<NuxtImg
						v-if="props.playlistOwnerAvatar"
						:src="props.playlistOwnerAvatar"
						alt="avatar"
						class="max-w-6 rounded-full"
					/>
					<div v-else class="h-6 w-6 rounded-full bg-zinc-500" />

					<!-- TODO: update link -->
					<NuxtLink
						:to="localePath(`/me`)"
						class="underline-offset-2 hover:underline dark:text-white"
					>
						{{ props.playlist.owner.display_name }}
					</NuxtLink>

					<p
						v-if="!props.playlist.followers.total"
						class="text-zinc-600 dark:text-zinc-400"
					>
						<span>&bull;</span>
						{{ t('dictionary.follower', props.playlist.followers.total) }}
					</p>

					<span class="text-zinc-600 dark:text-zinc-400">&bull;</span>

					<PlaylistTracksInfo
						:playlist-tracks-quantity="props.playlist.tracks.total"
						:playlist-length-ms="props.playlistLengthMs"
					/>
				</div>
			</div>
		</div>
	</section>
</template>
