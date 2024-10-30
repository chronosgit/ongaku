<script setup lang="ts">
	import type IPlaylistObject from '~/interfaces/business/playlists/IPlaylistObject';
	import PlaylistCover from './PlaylistCover.vue';
	import PlaylistTracksInfo from './PlaylistTracksInfo.vue';

	const props = defineProps<{
		playlist: IPlaylistObject | null;
		playlistOwnerAvatar: string | null;
		playlistDurationMs: number | null;
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
		class="bg-opacity-50 p-4"
		:style="{
			'border-top-left-radius': 'inherit',
			'border-top-right-radius': 'inherit',
		}"
	>
		<p v-if="props.playlist == null" class="text-3xl font-bold dark:text-white">
			404
		</p>

		<!-- Existing playlist -->
		<div
			v-else
			class="flex flex-col items-center gap-4 xs:flex-row xs:items-end"
		>
			<PlaylistCover :avatars="props.playlist.images" />

			<div class="space-y-3">
				<!-- Type -->
				<p class="text-sm dark:text-white">
					{{ $t(`dictionary.${props.playlist.type}.one`) || 'Media' }}
				</p>

				<!-- Playlist name -->
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
				<div class="flex items-center gap-1.5 text-sm font-medium">
					<!-- Owner avatar  -->
					<NuxtImg
						v-if="props.playlistOwnerAvatar"
						:src="props.playlistOwnerAvatar"
						alt="avatar"
						class="max-w-6 rounded-full"
					/>

					<!-- Avatar placeholder -->
					<div v-else class="h-6 w-6 rounded-full bg-zinc-500" />

					<NuxtLink
						class="underline-offset-2 hover:underline dark:text-white"
						@click="console.log('Redirect to playlist owner page')"
					>
						{{ props.playlist.owner.display_name }}
					</NuxtLink>

					<span
						v-if="!props.playlist.followers.total"
						class="text-zinc-600 dark:text-zinc-400"
					>
						&bull;
					</span>

					<p
						v-if="!props.playlist.followers.total"
						class="text-zinc-600 dark:text-zinc-400"
					>
						{{ t('dictionary.follower', props.playlist.followers.total) }}
					</p>

					<span class="text-zinc-600 dark:text-zinc-400">&bull;</span>

					<PlaylistTracksInfo
						:playlist-tracks-quantity="props.playlist.tracks.total"
						:playlist-length-ms="props.playlistDurationMs"
					/>
				</div>
			</div>
		</div>
	</section>
</template>
