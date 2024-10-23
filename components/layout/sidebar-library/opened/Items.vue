<script setup lang="ts">
	import { IconQuestionMark } from '~/components/ui/icons';
	import ItemsSkeleton from './ItemsSkeleton.vue';
	import type IMediaAlbumOrPlaylist from '~/interfaces/IMediaAlbumOrPlaylist';

	const props = defineProps<{
		items: IMediaAlbumOrPlaylist[] | null;
		isLoading: boolean;
	}>();
</script>

<template>
	<!-- Loading indicator -->
	<ItemsSkeleton v-if="props.isLoading" />

	<!-- After loading -->
	<template v-else>
		<!-- Items -->
		<div v-if="props.items" class="flex flex-col gap-1">
			<div
				v-for="i in props.items"
				class="cursor-pointer rounded-md p-1.5 transition-colors hover:bg-gray-200 dark:hover:bg-[#252525]"
			>
				<div class="flex items-center gap-2">
					<NuxtImg
						v-if="i.image.url"
						:src="i.image.url"
						class="w-full max-w-12 rounded-md"
					/>

					<div
						v-else
						class="flex h-12 w-12 items-center justify-center rounded-md bg-zinc-300 dark:bg-zinc-700"
					>
						<IconQuestionMark
							class="scale-150 text-zinc-400 dark:text-zinc-500"
						/>
					</div>

					<div class="">
						<p>{{ i.name }}</p>

						<p class="text-xs text-gray-400">
							{{ $t(`dictionary.${i.type}.one`) }} &#x2022; {{ i.owner }}
						</p>
					</div>
				</div>
			</div>
		</div>

		<!-- No items -->
		<!-- TODO: update message if filters -->
		<p v-else>
			<span>{{ $t('modules.sidebar-library.opened.no-items') }}</span>
		</p>
	</template>
</template>
